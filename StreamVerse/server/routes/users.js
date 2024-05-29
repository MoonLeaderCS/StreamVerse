import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  updateUser,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
} from "../controllers/user.js";

const router = express.Router();

// user == channel

// update user
router.put("/:id", verifyToken, updateUser);

// delete user
router.delete("/:id", verifyToken, deleteUser);

// get user without logged in (verifyToken)
router.get("/find/:id", getUser);

// subscribe a user
router.put("/subs/:id", verifyToken, subscribe);

// unsubscribe a user
router.put("/unsubs/:id", verifyToken, unsubscribe);

// like a video
router.put("/like/:videoId", verifyToken, like);

// dislike a video
router.put("/dislike/:videoId", verifyToken, dislike);

export default router;
