import * as PayrollService from '../../../services/admin/payroll/payroll.service.js';

export const getPayrollPreview = async (req, res) => {
    try {
        const month = parseInt(req.query.month);
        const year = parseInt(req.query.year);

        if (!month || !year) {
            return res.status(400).json({ success: false, message: "Parameter month dan year wajib diisi." });
        }

        const data = await PayrollService.getPayrollPreviewService(month, year);
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const generatePayroll = async (req, res) => {
    try {
        const { month, year } = req.body;

        if (!month || !year) {
            return res.status(400).json({ success: false, message: "Body month dan year wajib diisi." });
        }

        const result = await PayrollService.generatePayrollService(month, year);
        res.status(201).json({ success: true, message: result.message });
    } catch (error) {
        // Balas dengan status 400 jika errornya berupa validasi (misal: "sudah di-generate")
        res.status(400).json({ success: false, message: error.message });
    }
};

export const getPayrollHistory = async (req, res) => {
    try {
        const month = parseInt(req.query.month);
        const year = parseInt(req.query.year);

        if (!month || !year) {
            return res.status(400).json({ success: false, message: "Parameter month dan year wajib diisi." });
        }

        const data = await PayrollService.getPayrollHistoryService(month, year);
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};