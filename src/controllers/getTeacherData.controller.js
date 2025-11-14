import {
  getTeacherDataService,
  getTeacherDataByIdService,
  getTeacherDataByGenderService,
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

export const getTeacherDataByGenderController = async (request, response) => {
  const genderOption = request.params.gender;

  if ((genderOption != "Laki-laki") | (genderOption != "Perempuan")) {
    response.json({
      status: "Bad request",
      message: "failed to get teacher data, gender is invalid.",
    });
  }

  const result = await getTeacherDataByGenderService(genderOption);

  response.json({
    status: "Success",
    message: `success get teacher data with ${genderOption} gender.`,
    data: result,
  });
};
