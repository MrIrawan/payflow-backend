import express from "express";
import { adminLoginController } from "../../../controllers/admin/auth/adminAuth.controller";

const router = express.Router();

router.post("/signIn", adminLoginController);

export default router;
