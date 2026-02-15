import express from "express";

import { storeEmployeeAttendanceController } from "../../../controllers/user/attendance/storeEmployeeAttendance.controller.js";
import { getEmployeeAttendanceController } from "../../../controllers/user/attendance/getEmployeeAttendance.controller.js";

const route = express.Router();

route.post("/attendance/store", storeEmployeeAttendanceController);
route.get("/attendance", getEmployeeAttendanceController);

export default route;