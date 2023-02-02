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

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_DB,
{useNewUrlParser: true, useUnifiedTopology: true})
.then(app.listen(PORT, ()=>console.log(`Server started on ${PORT}`)))
.catch((error)=>console.log("Error while connecting with the database", error));

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