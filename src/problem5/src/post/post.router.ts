import { Router } from "express";
import * as postController from "./post.controller";
import { authenticatedRequest } from "../helpers/authenticated-request.helper";
import { errorCaughtRequest } from "../helpers/error-caught-request.helper";

const router = Router();

router.get(
  "/",
  authenticatedRequest(),
  errorCaughtRequest(postController.getPosts)
);

router.post(
  "/",
  authenticatedRequest(),
  errorCaughtRequest(postController.createPost)
);

router.put(
  "/:id",
  authenticatedRequest(),
  errorCaughtRequest(postController.updatePost)
);

router.delete(
  "/:id",
  authenticatedRequest(),
  errorCaughtRequest(postController.deletePost)
);

export default router;
