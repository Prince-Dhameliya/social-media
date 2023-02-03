const ConversationModel = require("../Models/conversationModel.js");
const MessageModel = require("../Models/messageModel.js");
// import ConversationModel from "../Models/conversationModel.js";
// import MessageModel from "../Models/messageModel.js";

// Create new conversation
const createConversation = async (req, res) => {

    try {
        const isExist = await ConversationModel.find({
            members: [req.body.senderId, req.body.receiverId],
        })

        if(isExist.length === 0){
            const newConversation = new ConversationModel({
                members: [req.body.senderId, req.body.receiverId]
            });
            await newConversation.save()
            res.status(200).json(newConversation)
        }
        else{
            console.log(isExist);
            res.status(200).json(isExist[0])
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const getConversation = async (req, res) => {
    try {
        const conversation = await ConversationModel.find({
            members: { $in: [req.params.userId] },
        })
        // for (let i = conversation.length-1; i >= 0; i--) {
        //     const element = conversation[i];
        //     const isConversation = await MessageModel.find({
        //         conversationId: element._id
        //     })
        //     if(isConversation.length === 0){
        //         await ConversationModel.deleteOne({
        //             _id: element._id
        //         })
        //         conversation.splice(i,1);
        //     }
        // }
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteConversation = async (req, res) => {
    try {
        await ConversationModel.deleteOne({
            _id: req.params.conversationId,
        })
        await MessageModel.deleteMany({
            conversationId: req.params.conversationId
        })
        res.status(200).json("Conversation delete successfully!");
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { createConversation, deleteConversation, getConversation }