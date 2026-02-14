import express from "express";
import { adminLoginController } from "../controllers/adminAuth.controller.js";

const router = express.Router();

router.post("/signIn", adminLoginController);

export default router;
