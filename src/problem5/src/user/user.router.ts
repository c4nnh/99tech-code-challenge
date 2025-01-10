import { Router } from "express";
import * as userController from "./user.controller";
import { authenticatedRequest } from "../helpers/authenticated-request.helper";
import { errorCaughtRequest } from "../helpers/error-caught-request.helper";

const userRouter = Router();

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 email:
 *                   type: string
 *                   format: email
 *                 name:
 *                   type: string
 *       400:
 *         description: Bad Request - Invalid input parameters
 *       401:
 *         description: Unauthorized - Invalid or missing bearer token
 */
userRouter.get(
  "/me",
  authenticatedRequest(),
  errorCaughtRequest(userController.getCurrentProfile)
);

export { userRouter };
