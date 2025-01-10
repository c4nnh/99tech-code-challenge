import { Router } from "express";
import * as authController from "./auth.controller";
import { errorCaughtRequest } from "../helpers/error-caught-request.helper";

const authRouter = Router();

authRouter.post("/login", errorCaughtRequest(authController.login));
authRouter.put(
  "/refresh-token",
  errorCaughtRequest(authController.refreshToken)
);

export { authRouter };
