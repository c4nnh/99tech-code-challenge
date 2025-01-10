import { Request } from "express";
import { v4 as uuidV4 } from "uuid";

export class Logger {
  constructor(private request: Request) {
    let requestId = this.request.headers["x-request-id"];
    if (!requestId) {
      requestId = uuidV4();
      this.request.headers["x-request-id"] = requestId;
    }
  }

  info(message: string, data?: Record<string, any>) {
    console.info(message, this.transformLogData(data));
  }

  error(message: string, data?: Record<string, any>) {
    console.error(message, this.transformLogData(data));
  }

  private transformLogData(data?: Record<string, any>) {
    return {
      requestId: this.request.headers["x-request-id"],
      timestamp: new Date().toISOString(),
      ...(this.request.ctx.user ? { userId: this.request.ctx.user.id } : {}),
      ...(data || {}),
    };
  }
}
