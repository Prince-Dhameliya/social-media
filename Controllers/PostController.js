const PostModel = require("../Models/postModel.js");
const mongoose = require("mongoose");
const UserModel = require("../Models/userModel.js");
const mongo = require('mongodb');
const {ObjectId} = require("mongodb");

// Create new post
const createPost = async (req, res) => {
    const newPost = new PostModel(req.body);

    try {
        await newPost.save()
        res.status(200).json(newPost)
    } catch (error) {
        res.status(500).json(error)
    }
}

// Get a Post
const getPost = async (req, res) => {
    const id = req.params.id;
    
    try {
        const post = await PostModel.findById(id);
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}

// Get all Post
const getAllPosts = async (req, res) => {
    try {
        const posts = await PostModel.find({});
        res.status(200).json(posts.sort((a,b)=>{
            return b.createdAt - a.createdAt;
        }));
    } catch (error) {
        res.status(500).json(error)
    }
}

// Update a Post
const updatePost = async (req, res) => {
    const postId = req.params.id;
    const {userId} = req.body;
    
    try {
        const post = await PostModel.findById(postId);

        if(post.userId === userId){
            await post.updateOne({$set : req.body})
            res.status(200).json("Post Updated!")
        }
        else{
            res.status(403).json("Action Forbidden")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

// Delete a Post
const deletePost = async (req, res) => {
    const postId = req.params.id;
    const {userId} = req.body;
    
    try {
        const post = await PostModel.findById(postId);
        await UserModel.updateMany({_id : post.userId},{$pull : {notification : {postId : post._id, type : "liked"}}});
        await UserModel.updateMany({_id : post.userId},{$pull : {notifications : {postId : post._id, type : "liked"}}});
        await UserModel.updateMany({_id : post.userId},{$pull : {notification : {postId : post._id, type : "comment"}}});
        await UserModel.updateMany({_id : post.userId},{$pull : {notifications : {postId : post._id, type : "comment"}}});

        await post.deleteOne();
        res.status(200).json("Post Delete Successfully")

        // if(post.userId === userId){
        //     // await post.deleteOne();
        //     // res.status(200).json("Post Delete Successfully")
        // }
        // else{
        //     res.status(403).json("Action Forbidden")
        // }
    } catch (error) {
        res.status(500).json(error)
    }
}

// like/dislike Post
const likePost = async (req, res) => {
    const postId = req.params.id;
    const {userId} = req.body;
    try {
        const post = await PostModel.findById(postId);
        if(!post.likes.includes(userId)){
            await post.updateOne({$push : {likes : userId}})
            if(userId !== post.userId){
                const User = await UserModel.findById(userId);
                const data = {
                    type: "liked",
                    userId : userId,
                    username : User.username,
                    userImage : User.profilePicture,
                    postId : post._id,
                    postImage : post.image,
                    createdAt: new Date()
                }
                await UserModel.updateOne({_id : post.userId},{$push : {notification : data}});
                await UserModel.updateOne({_id : post.userId},{$push : {notifications : data}});
            }
            res.status(200).json(post)
        }
        else{
            await post.updateOne({$pull : {likes : userId}})
            if(userId !== post.userId){
                await UserModel.updateOne({_id : post.userId},{$pull : {notification : {postId : post._id, type : "liked"}}});
                await UserModel.updateOne({_id : post.userId},{$pull : {notifications : {postId : post._id, type : "liked"}}});
            }
            res.status(200).json(post)
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
}

const bookmarkPost = async (req, res) => {
    const postId = req.params.id;
    const {userId} = req.body;

    try {
        const post = await PostModel.findById(postId);
        if(!post.saved.includes(userId)){
            await post.updateOne({$push : {saved : userId}})
            res.status(200).json(post)
        }
        else{
            await post.updateOne({$pull : {saved : userId}})
            res.status(200).json(post)
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
}


// Comment post
const commentPost = async (req, res) => {
    const postId = req.params.id;
    const {userId, username, profilePicture, comment} = req.body;
    let commentId = new mongo.ObjectId();
    const newData = {
        commentId: commentId,
        userId : userId,
        username: username,
        profilePicture: profilePicture,
        comment: comment,
        likes:[],
        createdAt: new Date()
    }

    try {
        await PostModel.updateOne({_id : postId}, {$push: {comments : newData}})
        const post = await PostModel.findById(postId)
        if(userId !== post.userId){
            const data = {
                type: "comment",
                userId : userId,
                username : username,
                userImage : profilePicture,
                postId : post._id,
                postImage : post.image,
                commentId: commentId,
                comment : comment,
                createdAt: new Date()
            }
            await UserModel.updateOne({_id : post.userId},{$push : {notification : data}});
            await UserModel.updateOne({_id : post.userId},{$push : {notifications : data}});
        }
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteComment = async(req, res) => {
    const {postId, userId} = req.body;
    let commentId = req.params.id;
    try {
        await PostModel.updateOne({_id : postId}, {$pull : {comments : {commentId: ObjectId(commentId)}}});
        const post = await PostModel.findById(postId);
        if(userId !== post.userId){
            await UserModel.updateOne({_id : post.userId},{$pull : {notification : {commentId: ObjectId(commentId), type : "comment"}}});
            await UserModel.updateOne({_id : post.userId},{$pull : {notifications : {commentId: ObjectId(commentId),  type : "comment"}}});
        }
        res.status(200).json("comment deleted successfully")
    } catch (error) {
        res.status(500).json(error)
    }
}

// Get Timeline Posts
// const getTimelinePosts = async (req, res) => {
//     const userId = req.params.id;  
    
//     try {
//         const currentUserPosts = await PostModel.find({userId : userId});
//         const followingPosts = await UserModel.aggregate([
//             {
//                 $match: {
//                     _id : new mongoose.Types.ObjectId(userId)
//                 }
//             },
//             {
//                 $lookup: {
//                     from : "posts",
//                     localField : "following",
//                     foreignField : "userId",
//                     as : "followingPosts"
//                 }
//             },
//             {
//                 $project: {
//                     followingPosts : 1,
//                     _id : 0
//                 }
//             }
//         ])
        
//         res
//         .status(200)
//         .json(currentUserPosts.concat(...followingPosts[0].followingPosts)
//         .sort((a,b)=>{
//             return b.createdAt - a.createdAt;
//         }));
        
//     } catch (error) {
//         res.status(500).json(error)
//     }
// }

const getTimelinePosts = async (req, res) => {
    const userId = req.params.id;  
    
    try {
        const posts = await PostModel.find({});

        res.status(200).json(posts.sort((a,b)=>{
            return b.createdAt - a.createdAt;
        }));
        
    } catch (error) {
        res.status(500).json(error)
    }
}

// Get Saved Posts
const getTimelineSavedPosts = async (req, res) => {
    const userId = req.params.id;  
    
    try {
        const posts = await PostModel.find({saved: userId});
        res.status(200).json(posts.sort((a,b)=>{
            return b.createdAt - a.createdAt;
        }));
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { bookmarkPost, commentPost, createPost, deleteComment, deletePost, getPost, getAllPosts, getTimelinePosts, getTimelineSavedPosts, likePost, updatePost }
