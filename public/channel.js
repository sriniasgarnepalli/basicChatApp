export function createChannel(socket, currentChannel, username) {
  console.log(currentChannel, "the current channel name");
  console.log(username, "user name");
  socket.emit("createChannel", currentChannel, username);
  socket.on("channelCreated", (currentChannel, username) => {
    console.log(currentChannel, "thjis");
    console.log(username, "this");
    window.location.href = `/channel/${encodeURIComponent(currentChannel)}`; // Redirect to the channel
  });
}

export function joinChannel(socket, channelName, username) {
  socket.emit("joinChannel", { channelName, username });
  // Handle the joining logic on the server side
}
