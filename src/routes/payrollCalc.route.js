import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { getRealTimePayroll } from "../controllers/payrollCalc.controller.js";

const router = express.Router();

// Endpoint Real-time Salary
router.get("/current", isAuthenticated, getRealTimePayroll);

export default router;