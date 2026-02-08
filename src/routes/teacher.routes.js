import { Router } from "express";

import { storeTeacherDataController } from "../controllers/storeTeacherData.controller.js";
import { updateTeacherDataController } from "../controllers/updateTeacherData.controller.js";
import { deleteTeacherDataController } from "../controllers/deleteTeacherData.controller.js";
import {
  getTeacherDataController,
  getTeacherDataByIdController,
} from "../controllers/getTeacherData.controller.js";
import { isAdminAuthenticated } from "../middleware/isAdminAuthenticated.js";

const route = Router();

route.post("/store/teacher", storeTeacherDataController);
route.get("/teachers", getTeacherDataController);
route.get("/teacher/:teacher_id", getTeacherDataByIdController);
route.put("/update/t/:teacher_id", updateTeacherDataController);
route.delete("/delete/t/:teacher_id", deleteTeacherDataController);

export default route;
