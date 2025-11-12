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
  const userDataObject = signUpSchema.safeParseAsync(req.body);

  if ((await userDataObject).error) {
    res.json({
      status: "Fail",
      message: "Fail to sign up",
      error: (await userDataObject).error.issues,
    });
  }

  const result = await signUpService((await userDataObject).data);
  const payload = successPayload("success to sign up", result);

  res.json({
    status: payload.status,
    message: payload.message,
    data: payload.data,
  });
};

export const signInWithEmailController = async (req, res, next) => {
  const userDataObject = signInWithEmailSchema.safeParseAsync(req.body);

  if ((await userDataObject).error) {
    res.json({
      status: "Fail",
      message: "fail to sign in with email.",
      error: (await userDataObject).error.issues,
    });
  }

  const result = await signInWithEmailService(
    (
      await userDataObject
    ).data.email_adress,
    (
      await userDataObject
    ).data.password_email
  );
  const payload = successPayload("success to sign in with email", result);
  res.json({
    result: payload,
  });
};
