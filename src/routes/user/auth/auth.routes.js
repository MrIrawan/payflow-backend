// express Router object
import { Router } from "express";
// import controllers
import {
  signInWithEmailController,
  signUpController,
} from "../../../controllers/user/auth/auth.controller.js";

// express Router instance
const route = Router();

route.post("/auth/register", signUpController);
route.post("/auth/login", signInWithEmailController);

export default route;
