import express from "express";

import { adminLoginController } from "../../../controllers/admin/auth/adminAuth.controller.js";
import { logoutAdminController } from "../../../controllers/admin/auth/logoutAdmin.controller.js"

const router = express.Router();

router.post("/auth/signIn", adminLoginController);
// logout admin endpoint
router.post("/auth/logout", logoutAdminController);

export default router;
