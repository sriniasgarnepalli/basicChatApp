export function setUsername(socket) {
  const username = document.getElementById("username").value;
  if (username === "") {
    alert("Username cannot be empty");
    return;
  }

  socket.emit("set username", username);
  document.getElementById("username-form").style.display = "none";
  document.getElementById("chat").style.display = "block";
  document.getElementById("form").style.display = "block";
}
