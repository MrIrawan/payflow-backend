import { Router } from "express";

import { updateTeacherDataController } from "../controllers/updateTeacherData.controller.js";
import { deleteTeacherDataController } from "../controllers/deleteTeacherData.controller.js";
import {
  getTeacherDataController,
  getTeacherDataByIdController,
} from "../controllers/getTeacherData.controller.js";
import { searchTeacherDataController } from "../controllers/searchTeacherData.controller.js";

const route = Router();

route.get("/teachers", getTeacherDataController);
route.get("/teacher/gender/:gender", searchTeacherDataController);
route.get("/teacher/:guru_id", getTeacherDataByIdController);
route.get("/teacher/search", searchTeacherDataController);
route.put("/update/t/:id", updateTeacherDataController);
route.delete("/delete/t/:id", deleteTeacherDataController);

export default route;
