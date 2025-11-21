// import schema validation
import { signUpSchema } from "../models/auth.schema.js";
import { signInWithEmailSchema } from "../models/auth.schema.js";
// import module services
import {
  signInWithEmailService,
  signUpService,
} from "../services/auth.service.js";
// import utils function to help controllers
import { successPayload } from "../utils/succesPayload.js";

export const signUpController = async (req, res, next) => {
  if (!req.body) {
    res.json({
      success: false,
      message: "sign up data is required",
      data: signUpData,
    });
  }

  const signUpData = signUpSchema.safeParse(req.body);

  if (signUpData.error) {
    res.json({
      success: false,
      message: "sign up failed, something went error",
      data: signUpData.data,
    });
  }

  const result = await signUpService(signUpData.data);
  const payload = successPayload(result);

  res.json({
    success: true,
    message: "sign up successfuly",
    data: payload,
  });
};

export const signInWithEmailController = async (req, res, next) => {
  if (!req.body) {
    res.json({
      success: false,
      message: "sign in data is required",
    });
  }

  const signInData = signInWithEmailSchema.safeParse(req.body);

  if (signInData.error) {
    res.json({
      success: false,
      message: "fail to sign in with email.",
      error: signInData.error.issues,
    });
  }

  const result = await signInWithEmailService(
    signInData.data.email_address,
    signInData.data.password_email
  );
  const payload = successPayload(result);
  res.json({
    success: true,
    result: payload,
  });
};
