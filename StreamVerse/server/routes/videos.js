// import mongoose from "mongoose";
import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  createVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  updateViews,
  trendVideos,
  randomVideos,
  subscribedVideos,
  search,
  getByTag
} from "../controllers/video.js";

const router = express.Router();

// create a video
router.post("/", verifyToken, createVideo);

// update a video
router.put("/:id", verifyToken, updateVideo);

// delete a video
router.delete("/:id", verifyToken, deleteVideo);

// get a video without logged in (verifyToken)
router.get("/find/:id", getVideo);

// update a views
router.put("/view/:id", updateViews);

// get a trending videos
router.get("/trend", trendVideos);

// get a random videos
router.get("/random", randomVideos);

// get all subscribed videos
router.get("/subs", verifyToken, subscribedVideos);

// get a video by searching title
router.get("/search", search);

// get a video by tags
router.get("/tags", getByTag);

export default router;
