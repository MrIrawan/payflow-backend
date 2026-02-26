import express from "express";

import { getUserInfoController } from "../../../controllers/user/info/getUserInfo.controller.js";
import { isUserAuthenticated } from "../../../middleware/isAuthenticated.js";

const router = express.Router();

router.get("/info", isUserAuthenticated, getUserInfoController);