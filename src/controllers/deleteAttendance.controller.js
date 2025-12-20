import { deleteAttendanceService } from "../services/deleteAttendance.service.js";

export const deleteAttendanceController = async (request, response) => {
  if (!request.params.attendance_id) {
    response.status(400).json({
      success: false,
      statusText: 400,
      message: "attendance ID is required",
    });
  }

  const deleteAttendance = await deleteAttendanceService(
    request.params.attendance_id
  );

  if (deleteAttendance.error) {
    response.status(deleteAttendance.error.code).json({
      success: false,
      statusText: deleteAttendance.statusText,
      message: deleteAttendance.error.message,
    });
  }

  response.status(deleteAttendance.status).json({
    success: true,
    statusText: deleteAttendance.statusText,
    message: `success to delete attendance with id <${request.params.attendance_id}>`,
  });
};
