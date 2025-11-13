import { Router } from "express";

import { updateTeacherDataController } from "../controllers/updateTeacherData.controller.js";
import { deleteTeacherDataController } from "../controllers/deleteTeacherData.controller.js";

const route = Router();

route.put("/update/t/:id", updateTeacherDataController);
route.delete("/delete/t/:id", deleteTeacherDataController);

export default route;
