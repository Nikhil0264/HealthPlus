import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { JWT_SECRET } from "../env.js";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.use(async (socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("No token"));

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return next(new Error("Unauthorized"));

    socket.user = user;
    next();
  });

  io.on("connection", (socket) => {
    socket.on("join-room", ({ roomId }) => {
      console.log(`User ${socket.user.name} joined room ${roomId}`);
      socket.join(roomId);
    });

    socket.on("requesting-video-call", ({ roomId }) => {
      console.log("video call requested");
       if (socket.user.role !== "doctor") return;
       console.log("emitting incoming-video-call");
      socket.to(roomId).emit("incoming-video-call", { roomId });
    });

    socket.on("ready-for-call", ({ roomId }) => {
      socket.to(roomId).emit("ready-for-call");
    });

    socket.on("offer", ({ roomId, offer }) => {
      socket.to(roomId).emit("offer", { offer });
    });

    socket.on("answer", ({ roomId, answer }) => {
      socket.to(roomId).emit("answer", { answer });
    });

    socket.on("ice-candidate", ({ roomId, candidate }) => {
      socket.to(roomId).emit("ice-candidate", { candidate });
    });

    socket.on("send-message", ({ roomId, message }) => {
  socket.to(roomId).emit("receive-message", {
    message,
    sender: socket.user.role,
    name: socket.user.name,
        });
    });

  });
};

export const getIO = () => io;
