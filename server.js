import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

// Express application
const app = express();

// Creating a server using http
const server = http.createServer(app);

// Setting up socket.io to work with the server
const io = new Server(server);

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const usernames = {}; // Store usernames by socket ID
const messages = {}; // Store messages with reactions by message ID

// Listening for connections from clients
io.on("connection", (socket) => {
  console.log("A user is connected");

  socket.on("set username", (username) => {
    usernames[socket.id] = username;
    io.emit("chat message", { event: `${username} has joined the chat` }); // Associate the username with the socket ID
  });

  // Listen for messages from client
  socket.on("chat message", ({ username, messageId, message, timeStamp }) => {
    // Store message with reactions initialized
    messages[messageId] = { username, message, timeStamp, reactions: {} };
    io.emit("chat message", {
      username,
      message,
      timeStamp,
      messageId,
      reactions: {}
    }); // Emit message to all the connected clients
  });

  socket.on("add reaction", ({ messageId, emoji }) => {
    const userId = usernames[socket.id];
    if (!messages[messageId]) return;

    // Toggle reaction to add or remove
    const userReactions = messages[messageId].reactions[emoji] || new Set();
    if (userReactions.has(userId)) {
      userReactions.delete(userId);
    } else {
      userReactions.add(userId);
    }

    messages[messageId].reactions[emoji] = userReactions;

    io.emit("reaction updated", {
      messageId,
      reactions: Object.fromEntries(
        Object.entries(messages[messageId].reactions).map(([emoji, users]) => [
          emoji,
          users.size
        ])
      )
    });
  });

  //   Handling user disconnect
  socket.on("disconnect", (data) => {
    const userStatus = data;
    const username = usernames[socket.id]; // Get the username associated with this socket
    delete usernames[socket.id]; // Remove the username from the list
    // Emit a disconnect message to all clients
    if (username) {
      io.emit("chat message", {
        username: username,
        status: `${userStatus}`
      });
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
