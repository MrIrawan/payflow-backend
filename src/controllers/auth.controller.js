import { signUpSchema } from "../models/auth.schema.js";
import { signUpService } from "../services/auth.service.js";

export const signUpController = async (req, res, next) => {
  try {
    const userDataObject = await signUpSchema.parseAsync(req.body);
    const result = await signUpService(userDataObject);

    res.json({
      status: "Success",
      message: "Success SignUp proccess",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
