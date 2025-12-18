import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";

import { storeAttendanceController } from "../controllers/storeAttendance.controller.js";
import { getAllAttendanceController } from "../controllers/getAllAttendance.controller.js";

const route = Router();

route.get("/attendance", verifyToken, getAllAttendanceController);
route.post("/attendance/store", verifyToken, storeAttendanceController);

export default route;
