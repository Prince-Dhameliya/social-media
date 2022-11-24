import mongoose from "mongoose";

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
        image: String,
        comments: []
    },
    {timestamps: true}
)

const PostModel = mongoose.model("Posts", PostSchema)

export default PostModel