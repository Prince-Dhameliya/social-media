import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js'
import UploadRoute from './Routes/UploadRoute.js'
import ConversationRoute from './Routes/ConversationRoute.js'
import MessageRoute from './Routes/MessageRoute.js'
import path from 'path';

import {Server} from "socket.io";
// import http from "http";
// import {ExpressPeerServer} from "peer";
import { SocketServer } from './socketServer.js';


// Routes
const app = express();
dotenv.config()
const PORT = process.env.PORT || 5000;

// to server images for public
app.use(express.static('public'))
app.use('/images', express.static("images"))

// Middelware
app.use(cors());
app.use(bodyParser.json({limit: "50mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));

mongoose.connect(process.env.MONGO_DB,
{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log("MongoDB Connected"))
.catch((error)=>console.log("Error while connecting with the database", error));

// ExpressPeerServer(http, { path: '/' })

// Socker Server
// const server = http.createServer(app);

const server = app.listen(PORT, ()=>console.log(`Server started on ${PORT}`))
const io = new Server(server,{
    cors:{
        origin:"/"
    }
});


io.on('connection', (socket) => {
    SocketServer(socket)
});

// usage of routes
app.use('/api', AuthRoute)
app.use('/api', UserRoute)
app.use('/api', PostRoute)
app.use('/api', ConversationRoute)
app.use('/api', MessageRoute)
// app.use('/api', UploadRoute)

// const __dirname = path.dirname(fileURLToPath(import.meta.url));
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, './client/build')));


app.get('*', function (req, res){
    res.sendFile(path.join(__dirname, './client/build/index.html'));
})

// app.get('/', function (req, res){
//     res.sendFile(path.join(__dirname, './client/build/index.html'));
// })

// app.get('/:id', function (req, res){
//     res.sendFile(path.join(__dirname, './client/build/index.html'));
// })

// app.get('/auth', function (req, res){
//     res.sendFile(path.join(__dirname, './client/build/index.html'));
// })

// app.get('/explore', function (req, res){
//     res.sendFile(path.join(__dirname, './client/build/index.html'));
// })

// app.get('/explore/search', function (req, res){
//     res.sendFile(path.join(__dirname, './client/build/index.html'));
// })

// app.get('/activity', function (req, res){
//     res.sendFile(path.join(__dirname, './client/build/index.html'));
// })

// app.get('/messages', function (req, res){
//     res.sendFile(path.join(__dirname, './client/build/index.html'));
// })

// app.get('/messages/:id', function (req, res){
//     res.sendFile(path.join(__dirname, './client/build/index.html'));
// })

// app.get('/:id/saved', function (req, res){
//     res.sendFile(path.join(__dirname, './client/build/index.html'));
// })