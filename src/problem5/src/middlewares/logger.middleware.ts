import { Request, Response, NextFunction } from "express";
import { v4 as uuidV4 } from "uuid";
import { Logger } from "../libs/logger";
import { RequestContext } from "../types/request-context.type";

export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.ctx) {
    req.ctx = {} as RequestContext;
  }
  req.ctx.logger = new Logger(req);

  const startTime = new Date();
  const { method, path, body, query, headers } = req;

  let requestId = headers["x-request-id"];
  if (!requestId) {
    requestId = uuidV4();
    res.setHeader("x-request-id", requestId);
    req.headers["x-request-id"] = requestId;
  }

  req.ctx.logger.info("Request received", {
    method,
    path,
    body,
    query,
  });

  res.on("finish", function () {
    var duration = Date.now() - startTime.getTime();
    req.ctx.logger.info("Request completed", {
      duration: duration,
      statusCode: res.statusCode,
    });
  });

  next();
}
