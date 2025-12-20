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
  const guruId = request.params.teacher_id;

  if (!guruId) {
    response.status(400).json({
      success: false,
      statusText: "Bad request",
      message: "failed to access data guru, teacher id is required.",
    });
  }

  const result = await getTeacherDataByIdService(guruId);

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
      message: `cannot find teacher data with id <${guruId}>`,
      data: result.data,
    });
  }

  response.status(200).json({
    success: true,
    statusText: "Ok",
    message: `accessing data guru with id <${guruId}>`,
    data: result.data,
  });
};

export const getTeacherDataByGenderController = async (request, response) => {
  const genderOption = request.params.gender;

  if (genderOption === undefined) {
    response.status(400).send({
      success: false,
      message: "failed to fetch.",
      error: {
        code: 400,
        text: "Bad request",
        detail: `unable to fetch teacher data, please insert gender option.`,
      },
    });
  }

  if (genderOption === "male" || genderOption === "female") {
    const result = await getTeacherDataByGenderService(genderOption);

    response.json({
      status: "Success",
      message: `success get teacher data with ${genderOption} gender.`,
      data: result,
    });
  } else {
    response.status(400).send({
      success: false,
      message: "failed to fetch.",
      error: {
        code: 400,
        text: "Bad request",
        detail: `unable to fetch teacher data with gender <${genderOption}>`,
      },
    });
  }
};
