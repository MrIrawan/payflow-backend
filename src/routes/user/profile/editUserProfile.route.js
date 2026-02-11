import express from "express";
import { editUserProfile } from "../../../controllers/user/profile/editUserProfile.controller.js";
import { isAuthenticated } from "../../../middleware/isAuthenticated.js";

const router = express.Router();
export default router;

router.put("/profile/edit", isAuthenticated, editUserProfile);