// express Router object
import { Router } from "express";
// import controllers
import {
  signInWithEmailController,
  signUpController,
} from "../../../controllers/user/auth/auth.controller.js";
import { logoutUserController } from "../../../controllers/user/auth/logoutUser.controller.js"

// express Router instance
const route = Router();

route.post("/auth/register", signUpController);
route.post("/auth/login", signInWithEmailController);

// logout user endpoint
route.post("/auth/logout", logoutUserController);

export default route;
