import { updateTeacherDataSchema } from "../models/updateTeacherData.schema.js";
import { updateTeacherDataService } from "../services/updateTeacherData.service.js";

export const updateTeacherDataController = async (request, response) => {
  const user_id = request.params.id;
  const userDataObject = updateTeacherDataSchema.safeParseAsync(request.body);

  if ((await userDataObject).data === undefined) {
    response.json({
      status: "Success",
      message: "success update teacher data, no one teacher data updated.",
    });
  }

  if ((await userDataObject).error) {
    response.json({
      status: "Fail",
      message: "failed to fetch update service.",
      error: (await userDataObject).error.issues,
    });
  }

  const result = await updateTeacherDataService(
    (
      await userDataObject
    ).data,
    user_id
  );

  response.json({
    status: "Success",
    message: `teacher with id <${user_id}> successfully updated.`,
    data: result,
  });
};
