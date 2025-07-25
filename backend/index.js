import express from "express";
import connectDB from "./lib/connectDB.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import webhookRouter from "./routes/webhook.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(clerkMiddleware());

app.use("/webhooks", bodyParser.raw({ type: "*/*" }), webhookRouter);

app.use(express.json());

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use("/analytics", analyticsRoutes);

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);

  res.status(error.status || 500).json({
    message: error.message || "Something went wrong!",
    status: error.status || 500,
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });
});

const startServer = async () => {
  try {
    await connectDB();

    // MongoDB Fix: Drop bad index & remove broken users
    const db = (await import("mongoose")).default.connection;

    db.once("open", async () => {
      console.log("MongoDB is ready, checking indexes...");

      const indexes = await db.db.collection("users").indexes();
      const hasOldIndex = indexes.some((i) => i.key.clerkId);

      if (hasOldIndex) {
        console.log("Removing invalid 'clerkId' index...");
        await db.db.collection("users").dropIndex("clerkId_1");
        console.log("Removed old 'clerkId' index");
      }

      const result = await db.db.collection("users").deleteMany({ clerkUserId: null });

      if (result.deletedCount > 0) {
        console.log(`🧹 Removed ${result.deletedCount} user(s) with null clerkUserId`);
      }
    });

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(` Server is running on port ${PORT}`);
    });

  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();