export function renderReactions(reactions, messageId) {
  const emojis = ["👍", "❤️", "😂"];
  return emojis
    .map((emoji) => {
      const count = reactions[emoji] || 0;
      return `<button onclick="addReaction('${messageId}', '${emoji}')">${emoji} ${count}</button>`;
    })
    .join(" ");
}

export function addReaction(messageId, emoji) {
  socket.emit("add reaction", { messageId, emoji });
}

export function updateReactions(messageId, reactions) {
  const reactionsEl = document.getElementById(`reactions-${messageId}`);
  if (reactionsEl) {
    reactionsEl.innerHTML = renderReactions(reactions, messageId);
  }
}
