import { Router } from "express";
import { isAuthenticate } from "../middleware/isAuthenticate.js";

import { storeAttendanceController } from "../controllers/attendance.controller.js";
import { updateAttendanceController } from "../controllers/attendance.controller.js";
import { getAllAttendanceController } from "../controllers/attendance.controller.js";
import { deleteAttendanceController } from "../controllers/attendance.controller.js";
import { getAttendanceByDateController } from "../controllers/attendance.controller.js";

const route = Router();

route.get("/attendance", isAuthenticate, getAllAttendanceController);
route.get("attendance/date", isAuthenticate, getAttendanceByDateController);
route.post("/attendance/store", isAuthenticate, storeAttendanceController);
route.put("/attendance/update/:attendance_id", isAuthenticate, updateAttendanceController);
route.delete("/attendance/delete/:attendance_id", isAuthenticate, deleteAttendanceController);

export default route;
