import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/database.js";
import messageRoute from "./routes/messageRoute.js";
import userRoute from "./routes/userRoute.js";
import { app, server } from "./socket/socket.js";

dotenv.config({});
connectDB();

const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(
    cors({
        origin: FRONTEND_URL,
        credentials: true,
    }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

app.get("/", (req, res) => {
    res.send("Backend is running Chat App");
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});