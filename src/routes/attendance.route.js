import { Router } from "express";
import { isAdminAuthenticated } from "../middleware/isAdminAuthenticated.js";

import { storeAttendanceController } from "../controllers/attendance.controller.js";
import { updateAttendanceController } from "../controllers/attendance.controller.js";
import { getAllAttendanceController } from "../controllers/attendance.controller.js";
import { deleteAttendanceController } from "../controllers/attendance.controller.js";
import { getAttendanceByDateController } from "../controllers/attendance.controller.js";

const route = Router();

route.get("/attendance", isAdminAuthenticated, getAllAttendanceController);
route.get("attendance/date", isAdminAuthenticated, getAttendanceByDateController);
route.post("/attendance/store", isAdminAuthenticated, storeAttendanceController);
route.put("/attendance/update/:attendance_id", isAdminAuthenticated, updateAttendanceController);
route.delete("/attendance/delete/:attendance_id", isAdminAuthenticated, deleteAttendanceController);

export default route;
