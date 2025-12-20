import { updateTeacherDataSchema } from "../models/updateTeacherData.schema.js";
import { updateTeacherDataService } from "../services/updateTeacherData.service.js";

export const updateTeacherDataController = async (request, response) => {
  const userId = request.params.id;
  const userDataObject = updateTeacherDataSchema.safeParse(request.body);

  if (userDataObject === undefined) {
    response.status(400).json({
      success: false,
      statusText: "Bad request",
      message: "unable to update taecher data, teacher update data is required",
    });
  }

  if (userDataObject.error) {
    response.status(400).json({
      success: false,
      message: userDataObject.error.issues,
    });
  }

  const result = await updateTeacherDataService(userDataObject.data, userId);

  if (result.error) {
    response.status(result.status).json({
      success: false,
      statusText: result.statusText,
      message: result.error.message,
      details: result.error.details,
    });
  }

  response.status(200).json({
    success: false,
    statusText: "Ok",
    message: `teacher data with id <${userId}> successfully updated.`,
    data: result.data,
  });
};
