import express from "express";
import http from "http";
import { Server } from "socket.io";

// Express application
const app = express();

// Creating a server using http
const server = http.createServer(app);

// Setting up socket.io to work with the server
const io = new Server(server);

// Serving static files from the 'public' directory
app.use(express.static("public"));

// Listening for connections from clients
io.on("connection", (socket) => {
  console.log("A user is connected");

  // Listen for messages from client
  socket.on("chat message", ({ user, message }) => {
    console.log(`Broadcasting message from ${user}: ${message}`); // Log the message being broadcast

    io.emit("chat message", { user, message }); // Emit message to all the connected clients
  });

  //   Handling user disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
