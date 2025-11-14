import { deleteTeacherDataService } from "../services/deleteTeacherData.service.js";

export const deleteTeacherDataController = async (request, response) => {
  const userId = request.params.id;
  if (!userId) throw new Error("user id is required.");

  const result = await deleteTeacherDataService(userId);

  if (result.error) {
    response.json({
      status: "Fail",
      message: `failed to delete teacher data with id <${userId}>`,
      error: result.error,
    });
  }

  response.json({
    status: "Success",
    message: `teacher with id <${userId}> successfully deleted.`,
  });
};
