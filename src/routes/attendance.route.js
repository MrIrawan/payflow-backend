import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";

import { storeAttendanceController } from "../controllers/storeAttendance.controller.js";
import { getAllAttendanceController } from "../controllers/getAllAttendance.controller.js";
import { updateAttendanceController } from "../controllers/updateAttendance.controller.js";
import { deleteAttendanceController } from "../controllers/deleteAttendance.controller.js";

const route = Router();

route.get("/attendance", getAllAttendanceController);
route.post("/attendance/store", storeAttendanceController);
route.put("/attendance/update/:attendance_id", updateAttendanceController);
route.delete("/attendance/delete/:attendance_id", deleteAttendanceController);

export default route;
