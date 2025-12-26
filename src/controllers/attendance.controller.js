import { attendanceSchema } from "../models/attendance.schema.js";
import { updateAttendanceSchema } from "../models/attendance.schema.js";

import { storeAttendanceService } from "../services/attendance.service.js";
import { updateAttendanceService } from "../services/attendance.service.js";
import { deleteAttendanceService } from "../services/attendance.service.js";
import { getAllAttendanceService } from "../services/attendance.service.js";
import { getAttendanceByDateService } from "../services/attendance.service.js";

import { isWithinAcceptableRadius } from "../utils/calculateDistance.js";

const schoolLat = parseFloat(process.env.SCHOOL_LATITUDE);
const schoolLon = parseFloat(process.env.SCHOOL_LONGITUDE);
const acceptableRadius = parseInt(process.env.ACCEPTABLE_RADIUS) || 500;

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

  if (!request.body.location) {
    response.status(406).json({
      success: false,
      statusText: "Not acceptable",
      message:
        "unable to store attendance data, user must contains their location.",
    });
  }

  const validateLocation = isWithinAcceptableRadius(
    request.body.location.latitude,
    request.body.location.longitude,
    schoolLat,
    schoolLon,
    acceptableRadius
  );

  if (!validateLocation.isValid) {
    response.status(403).json({
      success: false,
      statusText: "Forbidden",
      message: `you are ${validateLocation.distance}m away from school. maximum allowed distance: ${validateLocation.radiusLimit}m.`,
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

  if (storeAttendance.error) {
    response.status(storeAttendance.status).json({
      success: false,
      statusText: storeAttendance.statusText,
      message: storeAttendance.message,
      details: storeAttendance.details
    })
  }

  response.status(storeAttendance.status).json({
    success: true,
    statusText: storeAttendance.statusText,
    message: "success to store attendance data",
    data: storeAttendance.data,
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

export const getAttendanceByDateController = async (request, response) => {
  const date = request.body.date;

  if (!date) {
    response.status(400).json({
      success: false,
      statusText: "Bad Request",
      message: "unable to access get attendance by date, date is required.",
    });
  }

  const result = await getAttendanceByDateService(date);

  if (result.error) {
    response.status(result.status).json({
      success: true,
      statusText: result.statusText,
      message: result.error.message,
      details: result.error.details,
    });
  }

  response.status(result.status).json({
    success: true,
    statusText: result.statusText,
    message: `get attendance data by date ${date} is successfully`,
    data: result.data,
  });
};
