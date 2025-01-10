import { Request, Response } from "express";
import * as authService from "./auth.service";
import { parseRequestPayload } from "../helpers/parse-request-payload";
import { loginSchema, refreshTokenSchema } from "./auth.schema";
import { z } from "zod";

export async function login(req: Request, res: Response) {
  const dto = parseRequestPayload<z.infer<typeof loginSchema>>({
    schema: loginSchema,
    payload: req.body,
  });
  req.ctx.logger.info("Logging in", { dto });
  const data = await authService.login(req.ctx, dto);
  res.status(200).send(data);
}

export async function refreshToken(req: Request, res: Response) {
  req.ctx.logger.info("Refreshing token");

  const dto = parseRequestPayload<z.infer<typeof refreshTokenSchema>>({
    schema: refreshTokenSchema,
    payload: req.body,
  });

  const data = await authService.refreshToken(req.ctx, dto);
  res.status(200).send(data);
}
