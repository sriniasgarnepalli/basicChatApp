import express from "express";
import http from "http";
<<<<<<< HEAD
=======
import { disconnect } from "process";
>>>>>>> 81482c9 (chat application)
import { Server } from "socket.io";

// Express application
const app = express();

// Creating a server using http
const server = http.createServer(app);

// Setting up socket.io to work with the server
const io = new Server(server);

// Serving static files from the 'public' directory
app.use(express.static("public"));

<<<<<<< HEAD
=======
const usernames = {}; // Store usernames by socket ID

>>>>>>> 81482c9 (chat application)
// Listening for connections from clients
io.on("connection", (socket) => {
  console.log("A user is connected");

<<<<<<< HEAD
  // Listen for messages from client
  socket.on("chat message", ({ user, message }) => {
    console.log(`Broadcasting message from ${user}: ${message}`); // Log the message being broadcast

    io.emit("chat message", { user, message }); // Emit message to all the connected clients
  });

  //   Handling user disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected");
=======
  socket.on("set username", (username) => {
    usernames[socket.id] = username; // Associate the username with the socket ID
  });

  // Listen for messages from client
  socket.on("chat message", ({ username, message }) => {
    console.log(`Broadcasting message from ${username}: ${message}`); // Log the message being broadcast

    io.emit("chat message", { username, message }); // Emit message to all the connected clients
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
>>>>>>> 81482c9 (chat application)
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
