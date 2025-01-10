import { sign } from "jsonwebtoken";
import { User } from "@prisma/client";

export function generateAccessToken(user: User): string {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return sign(
    {
      userId: user.id,
      role: user.role,
    },
    jwtSecret,
    { expiresIn: "2h" }
  );
}

export function generateRefreshToken(user: User): string {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return sign(
    {
      userId: user.id,
      role: user.role,
    },
    jwtSecret,
    { expiresIn: "7d" }
  );
}
