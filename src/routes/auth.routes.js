// express Router object
import { Router } from "express";

import { signUpController } from "../controllers/auth.controller";

// express Router instance
const route = Router();

route.post("/auth/register", signUpController);

export default route;
