// import mongoose from "mongoose";
// import express from "express";
import { createError } from "../error.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  // console.log(req.body);
  // res.send(req.body);
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res
      .status(200)
      .send(
        "Successfully...New user has been created/signUp!!! [" +
          newUser.name +
          "]"
      );
  } catch (err) {
    // res.status(500).send({ error: err.message });
    // next(createError(404, "Error: Page not found!"));
    next(err);
  }
};

export const signin = async (req, res, next) => {
  // console.log(req.body);
  // res.send(req.body);
  try {
    // Find the user by name
    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(createError(404, "Error: User not found!"));

    // Compare the provided password with the stored hashed password
    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect)
      return next(
        createError(400, "Wrong Password...Please enter correct password!")
      );

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { password, ...others } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);

    // res.status(200).send("Successfully...Logged/Sign in!!! as " + user.name);
  } catch (error) {
    console.error('Error during sign-in:', error);
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (err) {
    next(err);
    console.error("Error during Google sign-in", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
