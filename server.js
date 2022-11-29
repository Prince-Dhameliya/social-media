import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js'
import UploadRoute from './Routes/UploadRoute.js'

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

if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'))
    app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
    });
}

// usage of routes
app.use('/auth', AuthRoute)
app.use('/user', UserRoute)
app.use('/posts', PostRoute)
// app.use('/upload', UploadRoute)