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

dotenv.config()
const app = express();

// Middelware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({limit: "50mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));

// to server images for public
app.use(express.static('public'))
app.use('/images', express.static("images"))

// Socket Section


// Routes
app.use('/api/auth', AuthRoute)
app.use('/api/user', UserRoute)
app.use('/api/posts', PostRoute)
app.use('/api/conversations', ConversationRoute)
app.use('/api/messages', MessageRoute)
// app.use('/api', UploadRoute)

// MongoDB Connection
const PORT = process.env.PORT || 5000;
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_DB,{
    // useCreateIndex: true,
    // useFindAndModify: false,
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(app.listen(PORT, () => console.log(`Server started on ${PORT}`)))
.catch((error) => console.log("Error while connecting with the database", error));

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', function (req, res){
    res.sendFile(path.join(__dirname, './client/build/index.html'));
})

// Listen PORT