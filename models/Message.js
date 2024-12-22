import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      message: { type: String, required: true },
      senderImage: { type: String, required: true }, // New field to store sender's profile image
      timestamp: { type: Date, default: Date.now },
    },
    { timestamps: true }
  );
  
  const Message = mongoose.model('Message', messageSchema);
  
  export default Message;
  
