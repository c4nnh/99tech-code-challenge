import { Router } from "express";
import * as userController from "./user.controller";
import { authenticatedRequest } from "../helpers/authenticated-request.helper";
import { errorCaughtRequest } from "../helpers/error-caught-request.helper";

const userRouter = Router();

userRouter.get(
  "/me",
  authenticatedRequest(),
  errorCaughtRequest(userController.getCurrentProfile)
);

export { userRouter };
