import {
  getTeacherDataService,
  getTeacherDataByIdService,
} from "../services/getTeacherData.service.js";

export const getTeacherDataController = async (request, response) => {
  const result = await getTeacherDataService();

  response.json({
    status: "Success",
    message: "success get all teachers data",
    data: result,
  });
};

export const getTeacherDataByIdController = async (request, response) => {
  const guruId = request.params.guru_id;

  if (!guruId) {
    response.json({
      status: "Bad request",
      message: "failed to access data guru, guru id is required.",
    });
  }

  const result = await getTeacherDataByIdService(guruId);

  response.json({
    status: "Success",
    message: `accessing data guru with id <${guruId}>`,
    data: result,
  });
};
