import MessageModel from "../Models/messageModel.js";

// Create new conversation
export const createMessage = async (req, res) => {
    const newMessage = new MessageModel(req.body);

    try {
        await newMessage.save()
        res.status(200).json(newMessage)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getMessage = async (req, res) => {
    try {
        const messages = await MessageModel.find({
            conversationId: req.params.conversationId
        });
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const deleteMessage = async (req, res) => {
    try {
        await MessageModel.deleteOne({
            _id: req.params.messageId
        });
        res.status(200).json("Message Delete Successfully")
    } catch (error) {
        res.status(500).json(error)
    }
}