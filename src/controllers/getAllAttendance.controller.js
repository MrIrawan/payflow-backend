import { response } from "express";
import { getAllAttendanceService } from "../services/getAllAttendance.service.js";

export const getAllAttendanceController = async (response, request) => {
  const getAllAttendance = await getAllAttendanceService();

  response.json({
    success: true,
    message: "success to get all attendance data",
    data: getAllAttendance,
  });
};
