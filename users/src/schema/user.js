import mongoose, { Schema } from "mongoose";

const user = new Schema({
  username: { type: String, trim: true, required: true },
  apiKey: { type: String, trim: true, required: true }
});

export default mongoose.model("user", user);