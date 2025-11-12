import { signUpSchema } from "../models/auth.schema.js";
import { signUpService } from "../services/auth.service.js";

export const signUpController = async (req, res, next) => {
  const userDataObject = signUpSchema.safeParseAsync(req.body);

  if ((await userDataObject).error) {
    res.json({
      status: "Fail",
      message: "Fail to sign up",
      error: (await userDataObject).error.issues,
    });
  }

  const result = await signUpService((await userDataObject).data);

  res.json({
    status: "Success",
    message: "success to sign up",
    data: result,
  });
};
