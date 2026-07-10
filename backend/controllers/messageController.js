import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getSocketIds, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const text = req.body.message?.trim();

    if (!text) {
      return res.status(400).json({ message: "Message is required" });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message: text,
    });

    conversation.messages.push(newMessage._id);
    await conversation.save();

    [senderId, receiverId].forEach((userId) => {
      getSocketIds(userId.toString()).forEach((socketId) => {
        io.to(socketId).emit("newMessage", newMessage);
      });
    });

    return res.status(201).json({ newMessage });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    return res.status(200).json(conversation?.messages || []);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
