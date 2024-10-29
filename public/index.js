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
  socket.emit("chat message", { username: username, message: msg }); // Emit the message
  document.getElementById("message").value = "";

  return false;
}

socket.on("connect", () => {
  console.log("Connected to the server");
});

socket.on("chat message", function (data) {
  console.log(data, "sss");
  if (data && data.username && data.message) {
    const item = document.createElement("li");
    item.textContent =
      data.username === username
        ? `${data.message}`
        : `${data.username}: ${data.message}`;
    item.className =
      data.username === username ? "my-message" : "other-message"; // Class based on sender
    document.getElementById("messages").appendChild(item);

    window.scrollTo(0, document.body.scrollHeight);
  } else if (data && data.username && data.status) {
    const item = document.createElement("li");
    item.textContent =
      data.username === username
        ? "User has disconnected"
        : `${data.username} has disconnected`;
    item.className = "disconnected-message";
    document.getElementById("messages").appendChild(item);

    window.scrollTo(0, document.body.scrollHeight);
  } else {
    console.error("Invalid message format:", data);
  }
});
