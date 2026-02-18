import { editEmployeeAttendance } from "../../../services/user/attendance/editEmployeeAttendance.service.js";
import { editEmployeeAttendanceSchema } from "../../../models/user/attendance/editEmployeeAttendance.schema.js";

export const editEmployeeAttendanceController = async (req, res) => {
    const teacherEmail = req.body.email_address;
}