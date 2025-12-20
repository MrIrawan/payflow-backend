import { attendanceSchema } from "../models/attendance.schema.js";
import { updateAttendanceSchema } from "../models/updateAttendance.schema.js";

import { storeAttendanceService } from "../services/attendance.service.js";
import { updateAttendanceService } from "../services/attendance.service.js";
import { deleteAttendanceService } from "../services/attendance.service.js";
import { getAllAttendanceService } from "../services/attendance.service.js";

export const getAllAttendanceController = async (request, response) => {
  const getAllAttendance = await getAllAttendanceService();

  response.json({
    success: true,
    message: "success to fetch all attendance data",
    data: getAllAttendance,
  });
};

export const storeAttendanceController = async (request, response) => {
  if (!request.body) {
    response.json({
      success: false,
      message: "failed to handle store attendance, attendance data is required",
    });
  }

  const attendanceData = attendanceSchema.safeParse(request.body);

  if (attendanceData.error) {
    response.status(400).json({
      success: false,
      statusText: "Bad Request",
      message: attendanceData.error.issues,
    });
  }

  const storeAttendance = await storeAttendanceService(attendanceData.data);

  response.status(201).json({
    success: true,
    statusText: "Created",
    message: "success to store attendance data",
    data: storeAttendance,
  });
};

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
