import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js'
import UploadRoute from './Routes/UploadRoute.js'
import path from 'path';

// Routes
const app = express();
dotenv.config()
const PORT = process.env.PORT || 5000;

// to server images for public
app.use(express.static('public'))
app.use('/images', express.static("images"))

// Middelware
app.use(bodyParser.json({limit: "50mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
app.use(cors());


mongoose.connect(process.env.MONGO_DB,
{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>app.listen(PORT, ()=>console.log(`listening at ${PORT}`)))
.catch((error)=>console.log("Error while connecting with the database", error));

// const __dirname = path.dirname(fileURLToPath(import.meta.url));
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, './client/build')));

app.get('/', function (req, res){
    res.sendFile(path.join(__dirname, './client/build/index.html'));
})

// app.get('/home', function (req, res){
//     res.sendFile(path.join(__dirname, './client/build/index.html'));
// })

app.get('/auth', function (req, res){
    res.sendFile(path.join(__dirname, './client/build/index.html'));
})

app.get('/explore', function (req, res){
    res.sendFile(path.join(__dirname, './client/build/index.html'));
})

app.get('/activity', function (req, res){
    res.sendFile(path.join(__dirname, './client/build/index.html'));
})

app.get('/:id/saved', function (req, res){
    res.sendFile(path.join(__dirname, './client/build/index.html'));
})

// usage of routes
app.use('/auth', AuthRoute)
app.use('/user', UserRoute)
app.use('/posts', PostRoute)
// app.use('/upload', UploadRoute)



// "client-install": "cd client && npm install",
// "client-build": "cd client && npm run build",
// "heroku-postbuild": "npm run client-install && npm run client-build"