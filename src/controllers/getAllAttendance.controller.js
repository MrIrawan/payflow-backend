import { response } from "express";
import { getAllAttendanceService } from "../services/getAllAttendance.service.js";

export const getAllAttendanceController = async (request, response) => {
  const getAllAttendance = await getAllAttendanceService();

  response.json({
    success: true,
    message: "success to fetch all attendance data",
    data: getAllAttendance,
  });
};
