import express from "express";

import { getUserProfileController } from "../../../controllers/user/profile/getUserProfile.controller.js";
import { isUserAuthenticated } from "../../../middleware/isAuthenticated.js";

const router = express.Router();

router.get("/profile", isUserAuthenticated, getUserProfileController);

export default router;
