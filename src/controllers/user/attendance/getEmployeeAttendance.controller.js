import { getEmployeeAttendance } from "../../../services/user/attendance/getEmployeeAttendance.service.js";

export const getEmployeeAttendanceController = async (req, res) => {
    const userId = req.user.sub;
    const accessToken = req.accessToken;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "gagal mendapatkan absensi, tidak ada ID pengguna."
        });
    }

    if (!accessToken) {
        return res.status(400).json({
            success: false,
            message: "gagal mendapatkan absensi, tidak ada token akses."
        });
    }

    const employeeAttendance = await getEmployeeAttendance(userId, accessToken);

    if (employeeAttendance?.error) {
        return res.status(employeeAttendance?.status).json({
            success: false,
            message: "gagal mendapatkan absensi.",
            error: employeeAttendance?.error?.message || "Terjadi kesalahan saat mengambil data absensi.",
            details: employeeAttendance?.error?.message || "Terjadi kesalahan saat mengambil data absensi."
        });
    }

    if (!employeeAttendance?.data || employeeAttendance?.data.length === 0) {
        return res.status(404).json({
            success: true,
            message: "berhasil mendapatkan absensi, tetapi tidak ada data absensi yang ditemukan.",
            data: []
        });
    }

    return res.status(200).json({
        success: true,
        message: "berhasil mendapatkan absensi.",
        data: employeeAttendance?.data
    })
}