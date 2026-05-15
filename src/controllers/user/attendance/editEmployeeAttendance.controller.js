import { editEmployeeAttendance } from "../../../services/user/attendance/editEmployeeAttendance.service.js";
import { editEmployeeAttendanceSchema } from "../../../models/user/attendance/editEmployeeAttendance.schema.js";

export const editEmployeeAttendanceController = async (req, res) => {
    const attendanceId = req.params.attendance_id;
    const accessToken = req.accessToken;
    const updateData = req.body;

    if (!attendanceId) {
        return res.status(400).json({ error: "Attendance ID is required." });
    }

    if (!updateData || Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: "Update data is required." });
    }

    if (!accessToken) {
        return res.status(401).json({ error: "Access token is required." });
    }

    const validateData = editEmployeeAttendanceSchema.safeParse(updateData);

    if (!validateData.success) {
        return res.status(400).json({
            error: "Invalid data format.",
            details: validateData.error.issues
        });
    }

    const editAttendanceResult = await editEmployeeAttendance(attendanceId, validateData.data, accessToken);

    if (editAttendanceResult?.error) {
        return res.status(editAttendanceResult?.status || 500).json({
            success: false,
            error: editAttendanceResult?.error?.message || "terjadi kesalahan saat mengedit absensi karyawan."
        });
    }

    if (!editAttendanceResult?.data || editAttendanceResult?.data.length === 0) {
        return res.status(404).json({
            success: false,
            message: "tidak ada data absensi karyawan yang ditemukan untuk diupdate."
        });
    }

    return res.status(200).json({
        success: true,
        message: "Attendance updated successfully.",
        data: editAttendanceResult?.data
    });
}