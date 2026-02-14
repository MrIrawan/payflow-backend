import * as payrollService from "../services/payrollCalc.service.js"

export const getRealTimePayroll = async (req, res) => {
    try {
        // Ambil ID dari token (req.user dari middleware)
        const userId = req.user.sub || req.user.id;

        const data = await payrollService.calculateRealTimeSalary(userId);

        return res.status(200).json({
            status: "success",
            data: data
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};