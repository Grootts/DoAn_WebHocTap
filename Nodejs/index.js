import express from "express";
import connectDB from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
const app = express();

dotenv.config();

const PORT = process.env.PORT || 8800;
connectDB();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is Running..");
});

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/course", courseRoutes);
app.listen(PORT, () => {
  console.log(`APi is Running on http://localhost:${PORT}`);
});
