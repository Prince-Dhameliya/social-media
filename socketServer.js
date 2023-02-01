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

export const SocketServer = (socket) => {
    //when connect
    console.log("user connected.");

    //take userId and socketId from user
    socket.on("addUser", userId=>{
        addUser(userId, socket?.id);
        socket.emit("getUsers", users);
    });

    //send and get message
    socket.on("sendMessage", ({senderId, receiverId, text})=>{
        const user = getUser(receiverId);
        console.log("send message");
        socket.to(user?.socketId).emit("getMessage",{
            senderId,
            text,
        })
    })

    //delete message
    socket.on("deleteMessage",({senderId, receiverId,messageId})=>{
        const user = getUser(receiverId);
        socket.to(user?.socketId).emit("getDeleteMessage",{
            senderId,
            receiverId,
            messageId,
        })
    })

    //somebody disconnect from socket server
    socket.on("disconnect", ()=>{
        console.log("user disconnected");
        removeUser(socket?.id);
        socket.emit("getUsers", users);
    })

};
