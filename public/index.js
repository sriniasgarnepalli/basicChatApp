import { setUsername } from "./username.js";
import { sendMessage, displayMessage } from "./chat.js";
import { displaySystemMessage } from "./systemMessages.js";
import { addReaction, updateReactions } from "./reactions.js";

let socket;
let username = "";
let channels = [];

function initSocket() {
  socket = io();

  socket.on("connect", () => {
    console.log("Connected to the server");
  });

  socket.on("chat message", function (data) {
    if (data && data.username && data.message) {
      displayMessage(data, username);
    } else if (data && data.username && data.status) {
      displaySystemMessage(
        data.username + " has disconnected",
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

document.getElementById("username-form").addEventListener("submit", (event) => {
  event.preventDefault();
  setUsername(socket);
});

document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  sendMessage(socket, username);
});

initSocket();
