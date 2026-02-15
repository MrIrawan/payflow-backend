import express from "express";

import { storeEmployeeAttendanceController } from "../../../controllers/user/attendance/storeEmployeeAttendance.controller.js";

const route = express.Router();

route.post("/attendance/store", storeEmployeeAttendanceController);

export default route;