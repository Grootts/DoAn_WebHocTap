import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  isVerified: {
    type: Boolean,
  },
  role: {
    type: String,
  },
});

const authModel = mongoose.model("user", authSchema);
export default authModel;
