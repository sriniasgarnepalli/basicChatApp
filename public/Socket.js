import { server } from "socket.io";

let socket;

export function initSocket() {
  socket = io();
  return socket;
}

export function getSocket() {
  if (!socket) {
    throw new Error("Socket is not initialized. Call initSocket first.");
  }
  return socket;
}
