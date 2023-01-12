import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import PostModel from "../Models/postModel.js";

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        let users = await UserModel.find();
        users = users.map((user)=>{
            const {password, ...otherDetails} = user._doc
            return otherDetails
        })
        res.status(200).json(users)
    } catch (error) {
        res.status(500). json(error)
    }
}

// Get User data from database
export const getUser = async (req, res) => {
    const id = req.params.id;
    
    try {
        const user = await UserModel.findById(id);

        if(user){
            const {password, ...otherDetails} = user._doc
            res.status(200).json(otherDetails)
        }
        else{
            res.status(404).json("No such user exists")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

// Update a user
export const updateUser = async (req, res) => {
    const id = req.params.id;
    const {_id, currentUserAdminStatus, password} = req.body.UserData;

    if(id === _id){
        try {

            if(password){
                const salt = await bcrypt.genSalt(10);
                req.body.UserData.password = await bcrypt.hash(password, salt);
            }

            const user = await UserModel.findByIdAndUpdate(id, req.body.UserData, {new: true,});

            if(req.body.UserData.profilePicture !== req.body.profilePicture){
                await PostModel.updateMany({userId: id}, {profilePicture: req.body.UserData.profilePicture})
            }

            const token = jwt.sign({
                username: user.username,
                id: user._id
            }, process.env.JWT_KEY, {expiresIn: '1h'})
            res.status(200).json({user, token})
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else{
        res.status(403).json("Access Denied! you can only update your own profile")
    }
}

// Delete User
export const deleteUser = async (req, res) => {
    const id = req.params.id;

    //delete for other saved posts✔
    //other followers✔
    //other following✔
    //other like✔
    //other comment✔
    //self all posts✔

    var {currentUserId, currentUserAdminStatus} = req.body;

    if(id === currentUserId || currentUserAdminStatus){
        // currentUserId = "63b8d2dcc2f7bead52d5aafb";
        try {
            await UserModel.updateMany({}, {$pull : {following : currentUserId}})
            await UserModel.updateMany({}, {$pull : {followers : currentUserId}})
            await UserModel.updateOne({_id : currentUserId}, {following : []})
            await UserModel.updateOne({_id : currentUserId}, {followers : []})
            await PostModel.updateMany({}, {$pull : {comments: {userId: currentUserId}}})
            await PostModel.updateMany({}, {$pull : {likes : currentUserId}})
            await PostModel.updateMany({}, {$pull : {saved : currentUserId}})
            await PostModel.deleteMany({userId : currentUserId})
            await UserModel.deleteOne({_id : currentUserId})
            res.status(200).json("User deleted successfully")
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else{
        res.status(403).json("Access Denied! you can only delete your own profile");
    }
}

// Follow a User
export const followUser = async (req, res) => {
    const id = req.params.id;

    const {_id} = req.body;

    if(_id === id){
        res.status(403).json("Action forbidden")
    }
    else{
        try {
            const followUser = await UserModel.findById(id);
            const followingUser = await UserModel.findById(_id);

            if(!followUser.followers.includes(_id)){
                await followUser.updateOne({$push : {followers: _id}})
                await followingUser.updateOne({$push : {following: id}})
                res.status(200).json("User followed!")
            }
            else{
                res.status(403).json("User is Already followed by you")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

// Unfollow a User
export const unfollowUser = async (req, res) => {
    const id = req.params.id;

    const {_id} = req.body;

    if(_id === id){
        res.status(403).json("Action forbidden")
    }
    else{
        try {
            const followUser = await UserModel.findById(id);
            const followingUser = await UserModel.findById(_id);

            if(followUser.followers.includes(_id)){
                await followUser.updateOne({$pull : {followers: _id}})
                await followingUser.updateOne({$pull : {following: id}})
                res.status(200).json("User unfollowed!")
            }
            else{
                res.status(403).json("User is not followed by you")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}