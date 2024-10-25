# Goal
The goal of this project is to help you understand how to work with websockets and implement real-time communication between clients and servers. This will help you understand how the real-time features of applications like chat applications, live scoreboards, etc., work.

# Requirements
You are required to build a CLI based application that can be used to either start the server or connect to the server as a client. Here are the sample commands that you can use:

broadcast-server start - This command will start the server.
broadcast-server connect - This command will connect the client to the server.
When the server is started using the broadcast-server start command, it should listen for client connections on a specified port (you can configure that using command options or hardcode for simplicity). When a client connects and sends a message, the server should broadcast this message to all connected clients.

The server should be able to handle multiple clients connecting and disconnecting gracefully.
