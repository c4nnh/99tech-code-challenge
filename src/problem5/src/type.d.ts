import { Logger } from "./libs/logger";
import { RequestContext } from "./types/request-context.type";

declare global {
  namespace Express {
    interface Request {
      ctx: RequestContext;
    }
  }
}
