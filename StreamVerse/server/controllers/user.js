import { createError } from "../error.js";
import User from "../models/user.js";
import Video from "../models/Video.js";

// export const test = (req, res) => {
//   res.json("Hi, Test User is working!!!");
//   res.send("Hi, Test User is working!!!");
//   console.log("Connected to 5000/api/users/test");
// };

export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You are not permitted to update this User!"));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json("Successfully... [" + user.name + "] user has been deleted!");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You are not permitted to delete this User!"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    const user = await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res
      .status(200)
      .json("Successfully...Subscribed! [" + user.name + "] channel");
  } catch (err) {
    next(err);
  }
};

export const unsubscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });
    const user = await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });
    res
      .status(200)
      .json("Successfully...Unsubscribed! [" + user.name + "] channel");
  } catch (err) {
    next(err);
  }
};

export const like = async (req, res, next) => {
  const user_id = req.user.id;
  const video_id = req.params.videoId;
  try {
    const video = await Video.findByIdAndUpdate(video_id, {
      $addToSet: { likes: user_id },
      $pull: { dislikes: user_id },
    });
    res
      .status(200)
      .json("Successfully...Liked! video Title: [" + video.title + "]");
  } catch (err) {
    next(err);
  }
};

export const dislike = async (req, res, next) => {
  const user_id = req.user.id;
  const video_id = req.params.videoId;
  try {
    const video = await Video.findByIdAndUpdate(video_id, {
      $addToSet: { dislikes: user_id },
      $pull: { likes: user_id },
    });
    res
      .status(200)
      .json("Successfully...Disliked! video Title: [" + video.title + "]");
  } catch (err) {
    next(err);
  }
};
