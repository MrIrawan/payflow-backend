import { updateAttendanceSchema } from "../models/updateAttendance.schema.js";
import { updateAttendanceService } from "../services/updateAttendance.service.js";

export const updateAttendanceController = async (request, response) => {
  if (!request.body && !request.params.attendance_id) {
    response.status(400).json({
      success: false,
      statusText: "Bad Request",
      message: "request body is required and attendance id is required",
    });
  }

  const updateAttendanceData = updateAttendanceSchema.safeParse(request.body);

  if (updateAttendanceData.error) {
    response.status(400).json({
      success: updateAttendanceData.success,
      statusText: "Bad Request",
      message: updateAttendanceData.error.message,
      issues: updateAttendanceData.error.issues,
    });
  }

  const updateAttendance = await updateAttendanceService(
    updateAttendanceData.data,
    request.params.attendance_id
  );

  response.status(200).json({
    success: true,
    message: "success to update attendance data",
    data: updateAttendance,
  });
};
