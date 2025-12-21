import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";

import { storeAttendanceController } from "../controllers/attendance.controller.js";
import { updateAttendanceController } from "../controllers/attendance.controller.js";
import { getAllAttendanceController } from "../controllers/attendance.controller.js";
import { deleteAttendanceController } from "../controllers/attendance.controller.js";
import { getAttendanceByDateController } from "../controllers/attendance.controller.js";

const route = Router();

route.get("/attendance", getAllAttendanceController);
route.get("attendance/date", getAttendanceByDateController);
route.post("/attendance/store", storeAttendanceController);
route.put("/attendance/update/:attendance_id", updateAttendanceController);
route.delete("/attendance/delete/:attendance_id", deleteAttendanceController);

export default route;
