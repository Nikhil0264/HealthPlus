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
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error("No token"));

      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.userId);

      if (!user) return next(new Error("Unauthorized"));

      socket.user = user;
      next();
    } catch (err) {
      console.error("Socket auth error:", err.message);
      next(new Error("Socket authentication failed"));
    }
  });

  io.on("connection", (socket) => {
    const { _id, role } = socket.user;
    
    console.log(`✅ Socket connected: ${_id} (${role})`);
    socket.on("join-room",({ roomId, userId, name, role })=>{
      socket.join(roomId);
      console.log(`${name} joined room ${roomId}`);
    })

    socket.on("send-message",(data)=>{
      io.to(data.roomId).emit("receive-message",data)
    })

    socket.on("start-video-call",({roomId,caller})=>{
      socket.to(roomId).emit("incomming-video-call",{caller});
    });

    socket.on("accept-video-call",({roomId})=>{
      socket.to(roomId).emit("video-call-accepted");
    })

    socket.on("reject-video-call",({roomId})=>{
      socket.to(roomId).emit("video-call-rejected");
    });

    socket.on("webrtc-offer",({roomId,offer})=>{
      socket.to(roomId).emit("webrtc-offer",offer);
    })

    socket.on("webrtc-answer",({roomId,answer})=>{
      socket.to(roomId).emit("webrtc-answer",answer);
    });

    socket.on("ice-candidate",({roomId,candidate})=>{
      socket.to(roomId).emit("ice-candidate",candidate);
    })

    socket.on("disconnect", () => {
      console.log(`❌ Socket disconnected: ${_id}`);
    });
  });
};

export const getIO = () => io;
