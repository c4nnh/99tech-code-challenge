import { NextFunction, Request, Response } from "express";
import {
  NotFoundError,
  ConflictError,
  UnauthenticatedError,
  BadRequestError,
  ForbiddenError,
} from "../error";
import { Logger } from "../libs/logger";
import { RequestContext } from "../types/request-context.type";

export function exceptionFilter(
  error: Error,
  req: Request,
  res: Response,
  _: NextFunction
) {
  if (!req.ctx) {
    req.ctx = {} as RequestContext;
  }

  if (!req.ctx.logger) {
    req.ctx.logger = new Logger(req);
  }

  if (error instanceof BadRequestError) {
    res.status(400).json({ message: error.message, metadata: error.metadata });
    return;
  }

  if (error instanceof NotFoundError) {
    res.status(404).json({ message: error.message, metadata: error.metadata });
    return;
  }

  if (error instanceof ConflictError) {
    res.status(409).json({ message: error.message, metadata: error.metadata });
    return;
  }

  if (error instanceof UnauthenticatedError) {
    res.status(401).json({ message: error.message, metadata: error.metadata });
    return;
  }

  if (error instanceof ForbiddenError) {
    res.status(403).json({ message: error.message, metadata: error.metadata });
    return;
  }

  // Default error handler
  res.status(500).json({ message: "Internal server error" });
}
