import express from "express";
import connectDB from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import lessonRoutes from "./routes/lessonRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import PaymentRouter from "./routes/paymentRoutes.js";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();

dotenv.config();

const PORT = process.env.PORT || 8800;
connectDB();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.get("/", (req, res) => {
  res.send("Backend is Running..");
});

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/lesson", lessonRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/payment", PaymentRouter);
const server = app.listen(PORT, () => {
  console.log(`APi is Running on http://localhost:${PORT}`);
});
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     credentials: true,
//   },
// });
// let onlineUsers = [];

// const addNewUser = (username, socketId) => {
//   !onlineUsers.some((user) => user.username === username) &&
//     onlineUsers.push({ username, socketId });
// };

// const removeUser = (socketId) => {
//   onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
// };

// const getUser = (username) => {
//   return onlineUsers.find((user) => user.username === username);
// };

// io.on("connection", (socket) => {
//   //when ceonnect
//   console.log("a user connected.");
//   socket.on("newUser", (username) => {
//     addNewUser(username, socket.id);
//   });

//   socket.on("sendNotification", ({ senderName, receiverName, type }) => {
//     const receiver = getUser(receiverName);
//     io.to(receiver.socketId).emit("getNotification", {
//       senderName,
//       type,
//     });
//   });
//   socket.on("disconnect", () => {
//     removeUser(socket.id);
//   });
// });
// io.listen(5000);
