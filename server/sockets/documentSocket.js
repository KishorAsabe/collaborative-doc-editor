const { Server } = require("socket.io");
const documentService = require("../services/documentService");
const Document = require("../models/Document");


// This section initializes Socket.IO on the server and listens for WebSocket connections.

module.exports = (server) => {
  const io = new Server(server);
   

//   
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("get-document", async (documentId) => {
      const document = await documentService.findOrCreateDocument(documentId);
      socket.join(documentId); // Join a room for the specific documentId
      socket.emit("load-document", document.data);
    });

    socket.on("send-changes", (delta) => {
        socket.broadcast.to(socket.id).emit("receive-changes", delta);
        // Broadcast changes to all connected clients in the same room
      });

    socket.on("save-document", async (data) => {
        try {

         // The socket.rooms property contains a Set with all rooms the socket is in
        // Here, we are assuming the user is in only one room, so we get the first room
            const [room] = Array.from(socket.rooms);
          await documentService.saveDocument(socket.room, data);
        } catch (error) {
          console.error("Error saving document:", error.message);
        }
      });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};
