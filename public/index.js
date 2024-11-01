import { setUsername } from "./username.js";
import { sendMessage, displayMessage } from "./chat.js";
import { displaySystemMessage } from "./systemMessage.js";
import { addReaction, renderReactions, updateReactions } from "./reaction.js";

let socket;
let username = "";
let channels = [];

// Initialize Socket.io
function initSocket() {
  socket = io();

  socket.on("connect", () => {
    console.log("Connected to the server");
  });

  socket.on("chat message", function (data) {
    if (data && data.username && data.message) {
      displayMessage(data, username, "notificationSound");
    } else if (data && data.username && data.status) {
      displaySystemMessage(
        `${data.username} has disconnected`,
        "disconnected-message",
        "userleft"
      );
    } else if (data && data.event) {
      displaySystemMessage(data.event, "user-joined", "userjoined");
    } else {
      console.error("Invalid message format:", data);
    }
  });

  socket.on("reaction updated", function ({ messageId, reactions }) {
    updateReactions(messageId, reactions);
  });
}

// Set up event listeners
document.addEventListener("DOMContentLoaded", () => {
  const usernameForm = document.getElementById("username-form");
  const messageForm = document.getElementById("message-form"); // Get the message form

  // Listen for the form submission
  usernameForm.addEventListener("submit", (event) => {
    event.preventDefault();
    username = document.getElementById("username").value; // Capture the username
    // Prevent the default form submission
    setUsername(socket); // Call the setUsername function
  });

  messageForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission
    sendMessage(socket, username); // Call the sendMessage function
  });
});

document.getElementById("messages").addEventListener("click", function (event) {
  if (event.target.matches(".reaction-button")) {
    const button = event.target;
    const [messageId, emoji] = button.dataset.reaction.split(",");
    addReaction(socket, messageId, emoji); // Call the addReaction function
  }
});

initSocket();
