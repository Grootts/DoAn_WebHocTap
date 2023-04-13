import express from "express";
import connectDB from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import lessonRoutes from "./routes/lessonRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

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
app.listen(PORT, () => {
  console.log(`APi is Running on http://localhost:${PORT}`);
});
