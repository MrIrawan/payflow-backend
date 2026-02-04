import { Router } from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

import { storeAttendanceController } from "../controllers/attendance.controller.js";
import { updateAttendanceController } from "../controllers/attendance.controller.js";
import { getAllAttendanceController } from "../controllers/attendance.controller.js";
import { deleteAttendanceController } from "../controllers/attendance.controller.js";
import { getAttendanceByDateController } from "../controllers/attendance.controller.js";

const route = Router();

route.get("/attendance", isAuthenticated, getAllAttendanceController);
route.get("attendance/date", isAuthenticated, getAttendanceByDateController);
route.post("/attendance/store", isAuthenticated, storeAttendanceController);
route.put("/attendance/update/:attendance_id", isAuthenticated, updateAttendanceController);
route.delete("/attendance/delete/:attendance_id", isAuthenticated, deleteAttendanceController);

export default route;
