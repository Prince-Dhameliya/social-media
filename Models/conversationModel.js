import mongoose from "mongoose";

const ConversationSchema = mongoose.Schema(
    {
        members: {
            type: Array,
        },
    },
    {timestamps: true}
)

const ConversationModel = mongoose.model("Conversations", ConversationSchema)

export default ConversationModel