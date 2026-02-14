import express from "express";
import { logoutUser } from "../controllers/user/userLogout.controller.js";
import { logoutAdmin } from "../controllers/adminLogout.controller.js";

const router = express.Router();

// === LOGOUT ROUTES ===
router.post("/user/logout", logoutUser);   // <-- Pintu User
router.post("/admin/logout", logoutAdmin); // <-- Pintu Admin

export default router;