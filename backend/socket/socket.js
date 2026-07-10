import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const userSocketMap = {};

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

export const getReceiverSocketId = (receiverId) => {
  const socketIds = userSocketMap[receiverId];
  return socketIds ? Array.from(socketIds)[0] : undefined;
};

export const getSocketIds = (userId) => Array.from(userSocketMap[userId] || []);

export const getSocketId = getReceiverSocketId;

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    if (!userSocketMap[userId]) {
      userSocketMap[userId] = new Set();
    }
    userSocketMap[userId].add(socket.id);
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    if (userId) {
      userSocketMap[userId]?.delete(socket.id);
      if (userSocketMap[userId]?.size === 0) {
        delete userSocketMap[userId];
      }
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
