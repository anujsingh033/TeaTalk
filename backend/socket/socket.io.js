import http from "http";
import expxres from "express";
import { Server } from "socket.io";
const app = expxres()
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "https://teatalk-forntend.onrender.com"
    }
});

const userSocketMap = {};
export const getReceiverSocketId = (receiver) => {
    return userSocketMap[receiver]
}
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId != undefined) {
        userSocketMap[userId] = socket.id;
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on("typing", ({ receiver }) => {
        const receiverSocket = getReceiverSocketId(receiver);
        if (receiverSocket) {
            io.to(receiverSocket).emit("userTyping", { sender: userId })
        }
    })
    socket.on("stopTyping", ({ receiver }) => {
        const receiverSocket = getReceiverSocketId(receiver);
        if (receiverSocket) {
            io.to(receiverSocket).emit("userStopTyping", { sender: userId })
        }
    })








    socket.on("disconnect", () => {
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })

})


export { app, server, io };