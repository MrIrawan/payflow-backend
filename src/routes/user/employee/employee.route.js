import express from "express";

import { getAllEmployeesOnCompanyController } from "../../../controllers/user/employee/getAllEmployeesOnCompany.js";
import { switchCompanyController } from "../../../controllers/user/employee/switchCompany.controller.js";

import { isUserAuthenticated } from "../../../middleware/isAuthenticated.js";

const route = express.Router();

route.get("/employees", isUserAuthenticated, getAllEmployeesOnCompanyController);
route.post("/company/switch", isUserAuthenticated, switchCompanyController);

export default route;