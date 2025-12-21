import { deleteTeacherDataService } from "../services/deleteTeacherData.service.js";

export const deleteTeacherDataController = async (request, response) => {
  const teacherId = request.params.teacher_id;
  if (!teacherId) {
    response.status(400).json({
      success: false,
      statusText: "Bad request",
      message: "unable to delete teacher data, teacher ID is required.",
    });
  }

  const result = await deleteTeacherDataService(teacherId);

  if (result.error) {
    response.status(result.status).json({
      success: false,
      statusText: result.statusText,
      message: result.error.message,
      details: result.error.details,
    });
  }

  response.status(200).json({
    success: true,
    statusText: "Ok",
    message: `successfully delete teacher data with id <${teacherId}>.`,
  });
};
