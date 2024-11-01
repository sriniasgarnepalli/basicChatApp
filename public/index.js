const socket = io();
let username = "";

function setUsername() {
  username = document.getElementById("username").value;
  if (username === "") {
    alert("Username cannot be empty");
    return;
  }
  socket.emit("set username", username);

  document.getElementById("username-form").style.display = "none"; // Hide username input
  document.getElementById("chat").style.display = "block"; // Show chat area
  document.getElementById("form").style.display = "block"; // Show chat area
}

function sendMessage() {
  const msg = document.getElementById("message").value;
  if (msg.trim() === "") {
    return false;
  }
  const timestamp = new Date().toLocaleString();
  const messageId = `msg-${Date.now()}`;
  socket.emit("chat message", {
    messageId: messageId,
    username: username,
    message: msg,
    timeStamp: timestamp
  }); // Emit the message
  document.getElementById("message").value = "";

  return false;
}

socket.on("connect", () => {
  console.log("Connected to the server");
});

socket.on("chat message", function (data) {
  if (data && data.username && data.message) {
    displayMessage(data);
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

function displayMessage(data) {
  const item = document.createElement("li");
  console.log(data.username, "user", username);
  item.className = data.username === username ? "my-message" : "other-message";
  item.setAttribute("data-timestamp", data.timeStamp);
  item.id = `message-${data.messageId}`;
  item.innerHTML =
    data.username === username
      ? `${data.message}
        <span class="timestamp">${data.timeStamp}</span>`
      : `<strong>${data.username}</strong>: ${data.message}
      <span class="timestamp">${data.timeStamp}</span>
    <div class="reactions" id="reactions-${data.messageId}">
      ${renderReactions(data.reactions || {}, data.messageId)}
    </div>
  `;

  const notificationSound = document.getElementById("notificationSound");
  notificationSound.play();

  document.getElementById("messages").appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
}

function displaySystemMessage(message, className, soundId) {
  const item = document.createElement("li");
  item.textContent = message;
  item.className = className;
  document.getElementById("messages").appendChild(item);

  const notificationSound = document.getElementById(soundId);
  notificationSound.play();

  window.scrollTo(0, document.body.scrollHeight);
}

function renderReactions(reactions, messageId) {
  const emojis = ["👍", "❤️", "😂"];
  return emojis
    .map((emoji) => {
      const count = reactions[emoji] || 0;
      return `<button onclick="addReaction('${messageId}', '${emoji}')">${emoji} ${count}</button>`;
    })
    .join(" ");
}

function addReaction(messageId, emoji) {
  socket.emit("add reaction", { messageId, emoji });
}

function updateReactions(messageId, reactions) {
  const reactionsEl = document.getElementById(`reactions-${messageId}`);
  if (reactionsEl) {
    reactionsEl.innerHTML = renderReactions(reactions, messageId);
  }
}
