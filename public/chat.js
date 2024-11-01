export function sendMessage(socket, username) {
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
  });

  document.getElementById("message").value = "";
  return false;
}

export function displayMessage(data, username) {
  const item = document.createElement("li");
  item.className = data.username === username ? "my-message" : "other-message";
  item.setAttribute("data-timestamp", data.timeStamp);
  item.id = `message-${data.messageId}`;

  item.innerHTML = `
    ${data.username === username ? "" : `<strong>${data.username}</strong>: `}${
    data.message
  }
    <span class="timestamp">${data.timeStamp}</span>
    <div class="reactions" id="reactions-${data.messageId}">
      ${renderReactions(data.reactions || {}, data.messageId)}
    </div>
  `;

  document.getElementById("messages").appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
}