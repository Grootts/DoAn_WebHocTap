const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const passwordRoutes = require("./routes/password");
const app = express();
dotenv.config();
//connect db
connection();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

//router
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/password-reset", passwordRoutes);
const port = process.env.PORT || 8800;
app.listen(port, console.log(`Listening on port ${port}...`));
