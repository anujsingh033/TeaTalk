import uploadToCloudinary from "../config/cloudinary.js"
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.io.js";

export const sendMessage = async (req, res) => {
    try {
        let sender = req.userId;
        let { receiver } = req.params;
        let { message } = req.body;
        if (!receiver) {
            return res.status(404).json({ message: "Receiver not found !!!" })
        }
        let image;
        if (req.file) {
            image = await uploadToCloudinary(req.file.path)
        }
        let conversation = await Conversation.findOne({ participants: { $all: [sender, receiver] } });

        let newMessage = await Message.create({ sender, receiver, message, image });

        if (!conversation) {
            conversation = await Conversation.create({ participants: [sender, receiver], messages: [newMessage._id] });
        } else {
            conversation.messages.push(newMessage._id);
            await conversation.save()
        }
        const receiverSocket = getReceiverSocketId(receiver);
        if (receiverSocket) {
            io.to(receiverSocket).emit("newMessage", newMessage);
        }

        return res.status(201).json(newMessage)
    } catch (error) {
        return res.status(500).json({ message: "Send message error", error: error.message })
    }
}

export const getMessages = async (req, res) => {
    try {
        let sender = req.userId;
        let { receiver } = req.params;
        let conversation = await Conversation.findOne({ participants: { $all: [sender, receiver] } }).populate("messages");
        if (!conversation) {
            if (!conversation) {
                return res.status(200).json([]);
            }
        }
        return res.status(200).json(conversation?.messages);
    } catch (error) {
        return res.status(500).json({ message: "Get message error", error: error.message })
    }
}

export const deleteOneUserMessage = async (req, res) => {
    try {
        let sender = req.userId;
        let { receiver } = req.params;
        let conversation = await Conversation.findOneAndDelete({ participants: { $all: [sender, receiver] } });
        if (!conversation) {
            return res.status(200).json({ message: "No conversation found !!!" });
        }
        await Message.deleteMany({ _id: { $in: conversation.messages } });
        await Conversation.findByIdAndDelete(conversation._id);

        return res.status(200).json({ message: "Conversation deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "delete one user message  error", error: error.message })

    }
}