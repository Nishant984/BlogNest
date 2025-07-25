import express from "express";
import { getUserAnalytics } from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/overview", getUserAnalytics);

export default router;
