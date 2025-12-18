import { attendanceSchema } from "../models/attendance.schema.js";
import { storeAttendanceService } from "../services/storeAttendance.service.js";

export const storeAttendanceController = async (request, response) => {
  if (!request.body) {
    response.json({
      success: false,
      message: "failed to handle store attendance, attendance data is required",
    });
  }

  const attendanceData = attendanceSchema.safeParse(request.body);

  if (attendanceData.error) {
    response.json({
      success: false,
      message: attendanceData.error.message,
      issue: attendanceData.error.issues,
    });
  }

  const storeAttendance = storeAttendanceService(attendanceData.data);

  response.json({
    success: true,
    message: "success to store attendance data",
    data: storeAttendance,
  });
};
