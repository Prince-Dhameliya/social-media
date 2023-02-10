const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required:true
        },
        profilePicture: String,
        desc: String,
        likes: [],
        saved: [],
        image: String,
        comments: []
    },
    {timestamps: true}
)

const PostModel = mongoose.model("Posts", PostSchema)

module.exports = PostModel