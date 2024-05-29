import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    videoId: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  }, 
  {
    timestamps: true,
  }
);

export default mongoose.model("Comment", CommentSchema);
