import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";
// import Users from "../../Frontend/src/Home/Left/Users"; 

dotenv.config();
const app = express()
const CLIENT_URL = process.env.CLIENT_URL || "https://chatapp-rhca.onrender.com";

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: CLIENT_URL,
        methods: ["GET", "POST"],
    }
})
const getRecieverSocketId=(recieverId)=>{
    return users[recieverId]
}
//  export const getReceiverSocketId = (receiverId) => {
//   return users[receiverId];
const users = {}
io.on("connection", (socket) => {
    console.log("a user connected", socket.id)
    const userId = socket.handshake.query.userId
    if (userId) {
        users[userId] = socket.id
        console.log("Hello", users)
    }
    io.emit("getOnlineUsers", Object.keys(users))

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id)
        delete users[userId]
        io.emit("getOnlineUsers", Object.keys(users))

    })
})
export { app, server, io ,getRecieverSocketId }
