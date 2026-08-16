import express from "express";

import { getAllEmployeesOnCompanyController } from "../../../controllers/user/employee/getAllEmployeesOnCompany.js";

import { isUserAuthenticated } from "../../../middleware/isAuthenticated.js";

const route = express.Router();

route.get("/employees", isUserAuthenticated, getAllEmployeesOnCompanyController);

export default route;