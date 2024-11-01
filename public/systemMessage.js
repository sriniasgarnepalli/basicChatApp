export function displaySystemMessage(message, className, soundId) {
  const item = document.createElement("li");
  item.textContent = message;
  item.className = className;
  document.getElementById("messages").appendChild(item);

  const notificationSound = document.getElementById(soundId);
  notificationSound.play();

  window.scrollTo(0, document.body.scrollHeight);
}
