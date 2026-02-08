import { updateTeacherDataSchema } from "../models/updateTeacherData.schema.js";
import { updateTeacherDataService } from "../services/admin/updateTeacherData.service.js";

export const updateTeacherDataController = async (request, response) => {
  const teacherId = request.params.teacher_id;
  const userDataObject = updateTeacherDataSchema.safeParse(request.body);

  if (userDataObject === undefined) {
    response.status(400).json({
      success: false,
      statusText: "Bad request",
      message: "unable to update taecher data, teacher update data is required",
    });
  }

  if (!teacherId) {
    response.status(400).json({
      success: false,
      statusText: "Bad request",
      message: "unable to update teacher data, teacher ID is required.",
    });
  }

  if (userDataObject.error) {
    response.status(400).json({
      success: false,
      message: userDataObject.error.issues,
    });
  }

  const result = await updateTeacherDataService(userDataObject.data, teacherId);

  if (result.error) {
    return response.status(result.status).json({
      success: false,
      statusText: result.statusText,
      message: result.error.message,
      details: result.error.details,
    });
  }

  return response.status(200).json({
    success: true,
    statusText: "Ok",
    message: `update data guru yang kamu lakukan telah berhasil.`,
    data: result.data,
  });
};
