import * as UserPayrollService from '../../../services/user/payroll/payroll.service.js';

export const getUserPayrollLive = async (req, res) => {
    try {
        const { teacher_id, month, year } = req.query;

        // Validasi input wajib
        if (!teacher_id || !month || !year) {
            return res.status(400).json({
                success: false,
                message: "Parameter teacher_id, month, dan year wajib diisi."
            });
        }

        // Panggil Service untuk hitung live
        const data = await UserPayrollService.getUserPayrollLiveService(teacher_id, month, year);
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getUserPayrollHistory = async (req, res) => {
    try {
        const { teacher_id, year } = req.query;

        // Validasi input wajib
        if (!teacher_id || !year) {
            return res.status(400).json({
                success: false,
                message: "Parameter teacher_id dan year wajib diisi."
            });
        }

        // Panggil Service untuk ambil history
        const data = await UserPayrollService.getUserPayrollHistoryService(teacher_id, year);
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};