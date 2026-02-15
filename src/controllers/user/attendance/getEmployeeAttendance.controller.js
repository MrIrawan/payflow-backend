import { getEmployeeAttendance } from "../../../services/user/attendance/getEmployeeAttendance.service.js";

export const getEmployeeAttendanceController = async (req, res) => {
    const teacherEmail = req.user.user_metadata.email_address;

    if (!teacherEmail) {
        return res.status(400).json({
            success: false,
            message: "gagal mendapatkan absensi, tidak ada alamat email guru."
        });
    }

    console.log(teacherEmail);

    const employeeAttendance = await getEmployeeAttendance(teacherEmail);

    if (employeeAttendance.success === false) {
        return res.status(400).json({
            success: false,
            message: "gagal mendapatkan absensi, guru tidak di temukan."
        });
    }

    if (employeeAttendance.attendanceResponse.error) {
        return res.status(employeeAttendance.attendanceResponse.status).json({
            success: false,
            message: employeeAttendance.attendanceResponse.error.message,
            details: employeeAttendance.attendanceResponse.error.details
        });
    }

    if (employeeAttendance.fetchError) {
        return res.status(500).json({
            success: false,
            message: employeeAttendance.fetchError
        });
    }

    return res.status(200).json({
        success: false,
        message: "berhasil mendapatkan absensi.",
        data: employeeAttendance.attendanceResponse.data
    })
}