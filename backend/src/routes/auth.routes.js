import { Router } from "express";
import {
  registerController,
  loginController,
} from "../controllers/auth.controller.js";
import validate from "../middleware/validate.middleware.js";
import {
  registerValidation,
  loginValidation,
} from "../validations/auth.validation.js";

const authRouter = Router();

authRouter.post("/register", registerValidation, validate, registerController);
authRouter.post("/login", loginValidation, validate, loginController);

export default authRouter;
