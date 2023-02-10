const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required:true
        },
        firstname: {
            type: String,
            required:true
        },
        lastname: {
            type: String,
            required:true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        profilePicture: String,
        coverPicture: String,
        bio: String,
        followers: [],
        following: [],
        notification: [],
        notifications: [], 
    },
    {timestamps: true}
)

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel