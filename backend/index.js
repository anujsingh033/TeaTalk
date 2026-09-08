import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDatabase from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.route.js";
import { app, server } from "./socket/socket.io.js";


const port = process.env.PORT || 5000;

app.use(cors({
    origin: "https://teatalk-forntend.onrender.com",
    credentials: true
}))
app.use(express.json());
app.use(cookieParser())
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter)


server.listen(port, () => {
    connectDatabase();
    console.log("Server started at ", port);
})
