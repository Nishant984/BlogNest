import express from "express"
import { getCurrentUser, getUserSavedPosts, savePost, updateUserBio, userPublicProfile } from "../controllers/user.controller.js"
import { requireAuth } from "@clerk/express"; 

const router = express.Router()

router.get("/saved", requireAuth(), getUserSavedPosts);
router.patch("/save", requireAuth(), savePost);
router.get("/me", requireAuth(), getCurrentUser);
router.patch("/update-bio", requireAuth(), updateUserBio);
router.get("/username/:username", userPublicProfile);

export default router