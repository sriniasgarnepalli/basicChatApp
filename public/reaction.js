export function renderReactions(reactions, messageId) {
  const emojis = ["👍", "❤️", "😂"];
  return emojis
    .map((emoji) => {
      const count = reactions[emoji] || 0;
      return `<button class="reaction-button" data-reaction="${messageId},${emoji}">${emoji} ${count}</button>`;
    })
    .join(" ");
}

export function addReaction(socket, messageId, emoji) {
  socket.emit("add reaction", { messageId, emoji });
}

export function updateReactions(messageId, reactions) {
  const reactionsEl = document.getElementById(`reactions-${messageId}`);
  if (reactionsEl) {
    reactionsEl.innerHTML = renderReactions(reactions, messageId);
  }
}

window.addReaction = addReaction;
