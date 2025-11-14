import { searchTeacherDataService } from "../services/searchTeacherData.service.js";

export const searchTeacherDataController = async (request, response) => {
  const searchQuery = request.query.name;

  if (!searchQuery) {
    response.json({
      status: "Bad request",
      message: "failed to search, search query is required.",
    });
  }

  const result = await searchTeacherDataService(searchQuery);

  response.json({
    status: "Success",
    message: `success to search teacher data with name '${searchQuery}'`,
    data: result,
  });
};
