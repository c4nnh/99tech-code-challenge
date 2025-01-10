import { UserRole } from "@prisma/client";
import { Logger } from "../libs/logger";

export type RequestContext = {
  user?: {
    id: string;
    role: UserRole;
  };
  logger: Logger;
};
