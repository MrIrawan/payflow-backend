// import schema validation
import { signUpSchema } from "../../../models/auth.schema.js";
import { signInWithEmailSchema } from "../../../models/auth.schema.js";
// import module services
import {
  signInWithEmailService,
  signUpService,
} from "../services/auth.service.js";
// import utils function to help controllers
import { successPayload } from "../../../utils/succesPayload.js";

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
      error: signUpData.error.issues,
    });
  }

  const result = await signUpService(signUpData.data);
  const { access_token, refresh_token } = result.session;

  res.cookie("accessToken", access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
  });

  res.cookie("refreshToken", refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  const payload = successPayload(result);
  res.json({
    success: true,
    message: "sign up successfuly",
    data: payload,
  });
};

export const signInWithEmailController = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: "sign in data is required",
    });
  }

  const signInData = signInWithEmailSchema.safeParse(req.body);

  if (signInData.error) {
    return res.status(400).json({
      success: false,
      message: "fail to sign in with email.",
      error: signInData.error.issues,
    });
  }

  const result = await signInWithEmailService(
    signInData.data.email_address,
    signInData.data.password_email
  );
  const { access_token, refresh_token } = result.session;

  res.cookie("accessToken", access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 1000,
  });

  res.cookie("refreshToken", refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  const payload = successPayload(result);
  res.json({
    success: true,
    result: payload,
  });
};
