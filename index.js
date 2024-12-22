import express from "express";
import http from "http";
import { Server } from "socket.io"; // Correct import for ES Modules
import dotenv from "dotenv";
import { Connection } from "./Databse/db.js";
import cors from "cors";
import bodyParser from "body-parser";
import Routes from "./routes/Routes.js";
import LoginRoutes from "./routes/LoginRoute.js";
import todoRoutes from "./routes/todoRoutes.js";
import LeavetypeRoutes from "./routes/LeaveTypeRoute.js";
import EmployeeRoutes from "./routes/UserRoutes.js";
import Message from "./models/Message.js";  // Import Message model
import messageRoutes from './routes/ChatGetmessageRoute.js';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server); // Initialize Socket.IO with the server

const Port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.use("/", Routes);
app.use("/api/user/", EmployeeRoutes);
app.use("/api/userLogin/", LoginRoutes);
app.use("/api/leavetype/", LeavetypeRoutes);
app.use("/api/todos", todoRoutes);
app.use('/api/messages', messageRoutes);

io.on("connection", (socket) => {
  console.log("New client connected");

  // Message sending and saving
  socket.on("send_message", async (data) => {
    if (!data.senderId || !data.receiverId || !data.message) {
      console.error("Missing required fields: senderId, receiverId, or message");
      return;
    }

    try {
      const senderImage = data.senderImage || ''; // Pass senderImage from frontend or fetch it from session

      // Emit the message to the recipient's room
      io.to(data.receiverId).emit("receive_message", {
        ...data,
        senderImage,
      });

      // Save the message to the database
      const newMessage = new Message({
        sender: data.senderId,
        receiver: data.receiverId,
        message: data.message,
        senderImage,
      });

      await newMessage.save(); // Save message with sender's profile image
      console.log("Message saved to database");
    } catch (err) {
      console.error("Failed to save message:", err);
    }
  });

  // Handle call initiation
  socket.on("call_user", (data) => {
    io.to(data.receiverId).emit("call_user", {
      callerId: data.callerId,
      callerName: data.callerName,
      offer: data.offer,
      callType: data.callType, // audio or video
    });
  });

  // Handle accepting the call
  socket.on("accept_call", (data) => {
    io.to(data.callerId).emit("accept_call", {
      receiverId: data.receiverId,
      answer: data.answer,
    });
  });

  // Handle ICE candidate exchange for WebRTC
  socket.on("ice_candidate", (data) => {
    io.to(data.receiverId).emit("ice_candidate", data.candidate);
  });

  // Handle disconnecting or ending the call
  socket.on("end_call", (data) => {
    io.to(data.receiverId).emit("end_call", { message: "The call has ended" });
    io.to(data.callerId).emit("end_call", { message: "The call has ended" });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start server and connect to the database
server.listen(4000, async () => {
  try {
    console.log(`Server is running on port ${Port}`);
    await Connection();  // Ensure database connection is successful
  } catch (error) {
    console.error("Database connection failed:", error);
  }
});
