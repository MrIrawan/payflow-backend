import express from 'express';
import {
    getUserPayrollLive,
    getUserPayrollHistory
} from '../../../controllers/user/payroll/payroll.controller.js';

const router = express.Router();

// Endpoint untuk kalkulator Gaji Berjalan User
// Contoh pemakaian: GET /api/user/payroll/live?teacher_id=xxx&month=2&year=2026
router.get('/live', getUserPayrollLive);

// Endpoint untuk Arsip Riwayat Gaji User
// Contoh pemakaian: GET /api/user/payroll/history?teacher_id=xxx&year=2026
router.get('/history', getUserPayrollHistory);

export default router;