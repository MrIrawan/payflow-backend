import express from 'express';
import {
    getPayrollPreview,
    generatePayroll,
    getPayrollHistory
} from '../../../controllers/admin/payroll/payroll.controller.js';

const router = express.Router();

// Endpoint 1: Menampilkan preview gaji yang masih berjalan (belum dikunci)
router.get('/preview', getPayrollPreview);

// Endpoint 2: Mengunci (generate) data gaji bulan ini ke database
router.post('/generate', generatePayroll);

// Endpoint 3: Menampilkan data gaji yang sudah dikunci (Arsip/History)
router.get('/history', getPayrollHistory);

export default router;