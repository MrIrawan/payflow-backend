import { Router } from "express";

import { updateTeacherDataController } from "../controllers/updateTeacherData.controller.js";
import { deleteTeacherDataController } from "../controllers/deleteTeacherData.controller.js";
import {
  getTeacherDataController,
  getTeacherDataByIdController,
} from "../controllers/getTeacherData.controller.js";

const route = Router();

route.get("/teachers", getTeacherDataController);
route.get("/teacher/:teacher_id", getTeacherDataByIdController);
route.put("/update/t/:teacher_id", updateTeacherDataController);
route.delete("/delete/t/:teacher_id", deleteTeacherDataController);

export default route;
