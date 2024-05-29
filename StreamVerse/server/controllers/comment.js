import { createError } from "../error.js";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

export const createComment = async (req, res, next) => {
  const newComment = new Comment({ ...req.body, userId: req.user.id });
  try {
    const savedComment = await newComment.save();
    return res.status(200).json(savedComment);
  } catch (err) {
    next(err);
  }
};

export const updateComment = async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  const video = await Video.findById(req.params.id);
  if (req.user.id === comment.userId || req.user.id === video.userId) {
    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedComment);
    } catch (err) {
      next(err);
    }
  } else {
    return next(
      createError(403, "You are not permitted to update this Comment!")
    );
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(req.params.id);
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json("Successfully...Deleted!!! [" + comment.comment + "]");
    } else {
      return next(
        createError(403, "You are not permitted to delete this comment!")
      );
    }
  } catch (err) {
    next(err);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    if (!comments) return next(createError(404, "Error: Comments not found!"));
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};
