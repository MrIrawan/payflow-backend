import { Router } from "express";
import { isAdminAuthenticated } from "../../../middleware/isAdminAuthenticated.js";

import { storeAttendanceController } from "../../../controllers/admin/attendance/attendance.controller.js";
import { updateAttendanceController } from "../../../controllers/admin/attendance/attendance.controller.js";
import { getAllAttendanceController } from "../../../controllers/admin/attendance/attendance.controller.js";
import { deleteAttendanceController } from "../../../controllers/admin/attendance/attendance.controller.js";
import { getAttendanceByDateController } from "../../../controllers/admin/attendance/attendance.controller.js";
import { getAttendanceChartController } from "../../../controllers/admin/attendance/getAttendanceChart.controller.js";

const route = Router();

route.get("/attendance", getAllAttendanceController);
route.get("/attendance/chart", getAttendanceChartController);
route.get("/attendance/date", isAdminAuthenticated, getAttendanceByDateController);
route.post("/attendance/store", storeAttendanceController);
route.put("/attendance/update/:attendance_id", isAdminAuthenticated, updateAttendanceController);
route.delete("/attendance/delete/:attendance_id", isAdminAuthenticated, deleteAttendanceController);

export default route;
