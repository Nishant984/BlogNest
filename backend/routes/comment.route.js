import express from "express"
import { addComment, deleteComment, getCommentsByUser, getPostComments } from "../controllers/comment.controller.js";

const router = express.Router();

router.get("/:postId", getPostComments);
router.post("/:postId", addComment);
router.delete("/:id", deleteComment);
router.get("/user/:userId", getCommentsByUser);

export default router