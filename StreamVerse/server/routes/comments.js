// import mongoose from "mongoose";
// import { verify } from "jsonwebtoken";
import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  createComment,
  updateComment,
  deleteComment,
  getComments,
} from "../controllers/comment.js";

const router = express.Router();

router.post("/", verifyToken, createComment);
router.put("/:id", verifyToken, updateComment);
router.delete("/:id", verifyToken, deleteComment);
router.get("/:videoId", getComments);

export default router;
