export function setUsername(socket) {
  const username = document.getElementById("username").value;
  if (username === "") {
    alert("Username cannot be empty");
    return;
  }

  socket.emit("set username", username);
  document.getElementById("usernameform").style.display = "none";
  document.getElementById("channel-form").style.display = "block";
}
