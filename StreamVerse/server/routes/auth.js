// import mongoose from "mongoose";
import express from "express";
import { signup, signin, googleAuth } from "../controllers/auth.js";

const router = express.Router();

// CREATE A NEW USER
router.post("/signup", signup);

// SIGN IN A USER
router.post("/signin", signin);

// GOOGLE AUTH
router.post("/google", googleAuth);

// Logout a user
// router.post("/logout", Logout);

export default router;
