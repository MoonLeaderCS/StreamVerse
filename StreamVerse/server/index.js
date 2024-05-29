import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import commentRoutes from "./routes/comments.js";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();



// connect with mongoDB
const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Connected to MongoDB with moonleader!!!");
    })
    .catch((err) => {
      throw err;
    });
};

// use CORS : middlewares
app.use(cors(
	{
		origin: ["https://StreamVerse.vercel.app"],
		methods: ["POST", "GET"],
		credentials: true
	}
));
app.use(cookieParser());
app.use(express.json());

// all API Routing : middlewares
app.use("/api/auth/", authRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/videos/", videoRoutes);
app.use("/api/comments/", commentRoutes);

//ErrorHandler: middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status: status,
    message: message,
  });
});

app.listen(PORT, () => {
  connect();
  console.log(`Connected to Server on port ${PORT}!!!`);
});
