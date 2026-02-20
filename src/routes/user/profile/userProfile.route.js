import express from "express";

import { getUserProfileController } from "../../../controllers/user/profile/getUserProfile.controller.js";
import { editUserProfile } from "../../../controllers/user/profile/editUserProfile.controller.js";

import { isUserAuthenticated } from "../../../middleware/isAuthenticated.js";

const router = express.Router();

router.get("/profile", isUserAuthenticated, getUserProfileController);
router.put("/profile/edit", isUserAuthenticated, editUserProfile);

export default router;