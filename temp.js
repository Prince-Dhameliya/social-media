import {Server} from "socket.io";
import dotenv from "dotenv";
import express from "express";
import http from "http";

const app = express();
dotenv.config()
const PORT = process.env.PORT || 7000;

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"*",
        credentials: true
    }
});

server.listen(PORT, console.log(`listening at port ${PORT}`));

let users = [];

const addUser = (userId, socketId) => {
    !users?.some(user=>user?.userId === userId) &&
    users?.push({userId, socketId});
}

const removeUser = (socketId) => {
    users = users?.filter(user=>user?.socketId !== socketId);
}

const getUser = (userId) => {
    return users?.find(user=>user?.userId === userId);
}

io.on('connection', (socket) => {
    //when connect
    console.log("user connected.");

    //take userId and socketId from user
    socket.on("addUser", userId=>{
        addUser(userId, socket?.id);
        io.emit("getUsers", users);
    });

    //send and get message
    socket.on("sendMessage", ({senderId, receiverId, text})=>{
        const user = getUser(receiverId);
        io.to(user?.socketId).emit("getMessage",{
            senderId,
            text,
        })
    })

    //delete message
    socket.on("deleteMessage",({senderId, receiverId,messageId})=>{
        const user = getUser(receiverId);
        io.to(user?.socketId).emit("getDeleteMessage",{
            senderId,
            receiverId,
            messageId,
        })
    })

    //somebody disconnect from socket server
    socket.on("disconnect", ()=>{
        console.log("user disconnected");
        removeUser(socket?.id);
        io.emit("getUsers", users);
    })

  });