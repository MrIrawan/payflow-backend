import express from "express";

import { storeEmployeeAttendanceController } from "../../../controllers/user/attendance/storeEmployeeAttendance.controller.js";
import { getEmployeeAttendanceController } from "../../../controllers/user/attendance/getEmployeeAttendance.controller.js";
import { editEmployeeAttendanceController } from "../../../controllers/user/attendance/editEmployeeAttendance.controller.js";

import { isUserAuthenticated } from "../../../middleware/isAuthenticated.js";

const route = express.Router();

route.post("/attendance/store", isUserAuthenticated, storeEmployeeAttendanceController);
route.get("/attendance", isUserAuthenticated, getEmployeeAttendanceController);
route.put("/attendance/:attendance_id", isUserAuthenticated, editEmployeeAttendanceController);

export default route;