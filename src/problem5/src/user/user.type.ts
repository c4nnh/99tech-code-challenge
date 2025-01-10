import { UserRole } from "@prisma/client";

export type RequestUser = {
  id: string;
  role: UserRole;
};
