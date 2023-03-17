// import { Server } from "http";

// const socketIO = require("socket.io");

// exports.$io = (server:Server) => {
//   return socketIO(server, {
//     transport: ["polling"],
//     cors: {
//       origin: "*",
//     },
//   });
// };

// exports.connection = (io) => {
//   io.on("connection", (socket) => {
//     console.log("A new user is connected");

//     socket.on("message", (message) => {
//       console.log(`message from ${socket.id} : ${message}`);
//     });

//     socket.on("disconnect", () => {
//       console.log(`socket ${socket.id} disconnected`);
//     });
//   });
// };
