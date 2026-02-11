import { calculatePayrollSchema } from "../models/calculatePayroll.schema.js";
import { calculateSalaryService } from "../services/calculateSalary.service.js";

export const calculateSalaryController = async (req, res) => {
    try {
        const { teacherId, totalWeeklyHours, month, year } = req.body;

        if (!teacherId || !totalWeeklyHours || !month || !year) {
            return res.status(400).json({ error: "Data input tidak lengkap" });
        }

        const validatePayload = calculatePayrollSchema.safeParse(req.body);

        if (validatePayload.error) {
            return res.status(400).json({
                success: false,
                message: validatePayload.error.message,
                issues: validatePayload.error.issues,
            })
        }

        const result = await calculateSalaryService(validatePayload.data);

        res.status(201).json({
            message: "Payroll berhasil dihitung dan disimpan",
            data: result
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};