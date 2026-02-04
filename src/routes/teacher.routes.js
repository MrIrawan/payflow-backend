import { Router } from "express";

import { storeTeacherDataController } from "../controllers/storeTeacherData.controller.js";
import { updateTeacherDataController } from "../controllers/updateTeacherData.controller.js";
import { deleteTeacherDataController } from "../controllers/deleteTeacherData.controller.js";
import {
  getTeacherDataController,
  getTeacherDataByIdController,
} from "../controllers/getTeacherData.controller.js";
import { isAuthenticate } from "../middleware/isAuthenticate.js";

const route = Router();

route.post("/store/teacher", isAuthenticate, storeTeacherDataController);
route.get("/teachers", isAuthenticate, getTeacherDataController);
route.get("/teacher/:teacher_id", isAuthenticate, getTeacherDataByIdController);
route.put("/update/t/:teacher_id", isAuthenticate, updateTeacherDataController);
route.delete("/delete/t/:teacher_id", isAuthenticate, deleteTeacherDataController);

export default route;
