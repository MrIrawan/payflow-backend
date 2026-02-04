import { Router } from "express";

import { storeTeacherDataController } from "../controllers/storeTeacherData.controller.js";
import { updateTeacherDataController } from "../controllers/updateTeacherData.controller.js";
import { deleteTeacherDataController } from "../controllers/deleteTeacherData.controller.js";
import {
  getTeacherDataController,
  getTeacherDataByIdController,
} from "../controllers/getTeacherData.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const route = Router();

route.post("/store/teacher", isAuthenticated, storeTeacherDataController);
route.get("/teachers", isAuthenticated, getTeacherDataController);
route.get("/teacher/:teacher_id", isAuthenticated, getTeacherDataByIdController);
route.put("/update/t/:teacher_id", isAuthenticated, updateTeacherDataController);
route.delete("/delete/t/:teacher_id", isAuthenticated, deleteTeacherDataController);

export default route;
