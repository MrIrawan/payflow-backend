import express from "express";

import { getAdminInfoController } from "../../../controllers/admin/info/getAdminInfo.controller.js";

const router = express.Router();

router.get("/info", getAdminInfoController);

export default router;