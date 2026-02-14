import { Router } from "express";

import { storeTeacherDataController } from "../../../controllers/admin/teacher/storeTeacherData.controller.js";
import { updateTeacherDataController } from "../../../controllers/admin/teacher/updateTeacherData.controller.js";
import { deleteTeacherDataController } from "../../../controllers/admin/teacher/deleteTeacherData.controller.js";
import {
  getTeacherDataController,
  getTeacherDataByIdController,
} from "../../../controllers/admin/teacher/getTeacherData.controller.js";

const route = Router();

route.post("/store/teacher", storeTeacherDataController);
route.get("/teachers", getTeacherDataController);
route.get("/teacher/:teacher_id", getTeacherDataByIdController);
route.put("/update/t/:teacher_id", updateTeacherDataController);
route.delete("/delete/t/:teacher_id", deleteTeacherDataController);

export default route;
