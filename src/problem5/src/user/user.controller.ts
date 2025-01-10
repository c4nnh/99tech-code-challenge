import { Request, Response } from "express";
import * as userService from "./user.service";

export async function getCurrentProfile(req: Request, res: Response) {
  req.ctx.logger.info("Getting current profile");
  const profile = await userService.getCurrentProfile(req.ctx);
  res.status(200).send(profile);
}
