import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";

import { storeAttendanceController } from "../controllers/storeAttendance.controller.js";

const route = Router();

route.post("attendance/store", verifyToken, storeAttendanceController);

export default route;
