import express from "express"
import { 
    getPosts, 
    getPost, 
    createPost,
    deletePost,
    uploadAuth,
    featurePost,
    increasePostViews,
    getPostsByUser,
    getPostById,
    getShareData,
 } from "../controllers/post.controller.js";
import increaseVisit from "../middlewares/increaseVisit.js";
import { requireAuth } from "@clerk/express";

const router = express.Router();

router.get("/upload-auth", uploadAuth);

router.get("/", getPosts);
router.get("/id/:id", getPostById);
router.get("/:slug", increaseVisit, getPost);
router.post("/", createPost);
router.delete("/:id", deletePost);
router.patch("/feature", featurePost)
router.put("/view/:id", increasePostViews);
router.get("/user/:userId", getPostsByUser);
router.post("/:id/share", getShareData);


export default router;