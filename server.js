const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const AuthRoute = require('./Routes/AuthRoute.js');
const UserRoute = require('./Routes/UserRoute.js');
const PostRoute = require('./Routes/PostRoute.js');
const UploadRoute = require('./Routes/UploadRoute.js');
const ConversationRoute = require('./Routes/ConversationRoute.js');
const MessageRoute = require('./Routes/MessageRoute.js');
const path = require("path");

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
app.use('/api', UploadRoute)

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

// const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', function (req, res){
    res.sendFile(path.join(__dirname, './client/build/index.html'));
})

// Listen PORT
