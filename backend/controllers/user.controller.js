import User from "../models/user.model.js";
import { clerkClient } from "@clerk/clerk-sdk-node";

export const getUserSavedPosts = async (req, res) => {
  try {
    const clerkUserId = req.auth()?.userId;

    if (!clerkUserId) {
      return res.status(401).json("Not authenticated!");
    }

    const user = await User.findOne({ clerkUserId });
    if (!user) return res.status(404).json("User not found");

    // Sync mongoId into Clerk publicMetadata
    await clerkClient.users.updateUserMetadata(clerkUserId, {
      publicMetadata: {
        mongoId: user._id.toString()
      }
    });

    res.status(200).json(user.savedPosts);
  } catch (err) {
    console.error("Error getting saved posts:", err);
    res.status(500).json("Something went wrong");
  }
};

export const savePost = async (req, res) => {
  try {
    const clerkUserId = req.auth()?.userId;
    const { postId } = req.body;

    if (!clerkUserId) {
      return res.status(401).json("Not authenticated!");
    }

    const user = await User.findOne({ clerkUserId });
    if (!user) return res.status(404).json("User not found");

    // Sync mongoId into Clerk publicMetadata
    await clerkClient.users.updateUserMetadata(clerkUserId, {
      publicMetadata: {
        mongoId: user._id.toString()
      }
    });

    const isSaved = user.savedPosts.includes(postId);

    await User.findByIdAndUpdate(
      user._id,
      isSaved
        ? { $pull: { savedPosts: postId } }
        : { $push: { savedPosts: postId } }
    );

    res.status(200).json(isSaved ? "Post unsaved" : "Post saved");
  } catch (err) {
    console.error("Error saving post:", err);
    res.status(500).json("Something went wrong");
  }
};

export const updateUserBio = async (req, res) => {
  const { bio } = req.body;
  const clerkUserId = req.auth().userId;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { clerkUserId },
      { bio },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Bio update failed:", error);
    res.status(500).json("Failed to update bio");
  }
};

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ clerkUserId: req.auth().userId });
  if (!user) return res.status(404).json("User not found");
  res.status(200).json(user);
};

export const userPublicProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select("username bio img createdAt");


    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};