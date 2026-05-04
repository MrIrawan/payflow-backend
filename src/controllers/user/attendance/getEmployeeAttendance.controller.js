import { getEmployeeAttendance } from "../../../services/user/attendance/getEmployeeAttendance.service.js";

export const getEmployeeAttendanceController = async (req, res) => {
    const userId = req.user.sub;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "gagal mendapatkan absensi, tidak ada ID pengguna."
        });
    }

    const employeeAttendance = await getEmployeeAttendance(userId);

    if (employeeAttendance?.error) {
        return res.status(employeeAttendance?.status).json({
            success: false,
            message: "gagal mendapatkan absensi.",
            error: employeeAttendance?.error?.message || "Terjadi kesalahan saat mengambil data absensi.",
            details: employeeAttendance?.error?.message || "Terjadi kesalahan saat mengambil data absensi."
        });
    }

    if (!employeeAttendance?.attendanceResponse?.data) {
        return res.status(404).json({
            success: false,
            message: "gagal mendapatkan absensi, data tidak ditemukan."
        });
    }

    return res.status(200).json({
        success: true,
        message: "berhasil mendapatkan absensi.",
        data: employeeAttendance?.attendanceResponse.data
    })
}