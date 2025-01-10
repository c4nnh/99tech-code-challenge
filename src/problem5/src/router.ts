import { Router } from "express";
import { userRouter } from "./user/user.router";
import { authRouter } from "./auth/auth.router";
import postRouter from "./post/post.router";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/posts", postRouter);

export { router };
