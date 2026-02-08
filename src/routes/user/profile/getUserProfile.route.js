import express from "express";
import { getUserProfileController } from "../../../controllers/user/profile/getUserProfile.controller.js";
import { isAuthenticated } from "../../../middleware/isAuthenticated.js";

const router = express.Router();

router.get("/profile", isAuthenticated, getUserProfileController);

export default router;
