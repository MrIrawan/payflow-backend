import {
  getTeacherDataService,
  getTeacherDataByIdService,
} from "../services/getTeacherData.service.js";

export const getTeacherDataController = async (request, response) => {
  const result = await getTeacherDataService();

  response.status(200).json({
    success: true,
    statusText: "Ok",
    message: "success get all teachers data",
    data: result,
  });
};

export const getTeacherDataByIdController = async (request, response) => {
  const teacherId = request.params.teacher_id;

  if (!teacherId) {
    response.status(400).json({
      success: false,
      statusText: "Bad request",
      message: "failed to access data guru, teacher id is required.",
    });
  }

  const result = await getTeacherDataByIdService(teacherId);

  if (result.error) {
    response.status(result.status).json({
      success: false,
      statusText: result.statusText,
      message: result.error.message,
      details: result.error.details,
    });
  }

  if (result.data.length === 0) {
    response.status(404).json({
      success: false,
      statusText: "Not found",
      message: `cannot find teacher data with id <${teacherId}>`,
      data: result.data,
    });
  }

  response.status(200).json({
    success: true,
    statusText: "Ok",
    message: `accessing teacher data with id <${teacherId}>`,
    data: result.data,
  });
};