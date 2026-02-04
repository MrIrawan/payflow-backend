import { Router } from "express";
import { refreshSessionController } from "../controllers/refreshSession.controller";

const router = Router();

router.post("/refresh", refreshSessionController);

export default router;
