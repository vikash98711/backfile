// In your backend (routes/messageRoutes.js)
import express from "express";
import Message from "../models/Message.js"; // Assuming you have the Message model


const router = express.Router();

// Endpoint to get messages between two users
router.get("/chat/:userId/:selectedUserId",  async (req, res) => {
    console.log("bodydata",req.params);
    
    try {
        const { userId, selectedUserId } = req.params;
    
        // Make sure both userId and selectedUserId are valid ObjectIds
        if (!userId || !selectedUserId) {
          return res.status(400).json({ message: 'Invalid user IDs' });
        }
    
        const messages = await Message.find({
          $or: [
            { sender: userId, receiver: selectedUserId },
            { sender: selectedUserId, receiver: userId },
          ],
        }).sort({ timestamp: 1 });
    
        res.json(messages);
      
        
      } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: 'Error fetching messages' });
      }
});

export default router;
