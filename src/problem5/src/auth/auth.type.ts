import { UserRole } from "@prisma/client";

export type AuthTokenPayload = {
  userId: string;
  role: UserRole;
};
