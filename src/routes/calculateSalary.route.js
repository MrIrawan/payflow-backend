import express from "express";
import { calculateSalaryController } from "../controllers/calculateSalary.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();
export default router;

// Endpoint: POST /api/payroll/calculate
router.post('/calculate', isAuthenticated, calculateSalaryController);