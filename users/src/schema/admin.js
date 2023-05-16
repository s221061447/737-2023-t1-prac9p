import mongoose, { Schema } from "mongoose";

const admin = new Schema({
  username: { type: String, trim: true, required: true },
  apiKey: { type: String, trim: true, required: true }
});

export default mongoose.model("admin", admin);