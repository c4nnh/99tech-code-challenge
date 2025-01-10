import { UnauthenticatedError } from "../error";
import { prisma } from "../libs/prisma";
import crypto from "crypto";
import { RequestContext } from "../types/request-context.type";
import { generateAccessToken, generateRefreshToken } from "./token.service";
import { verify } from "jsonwebtoken";
import { AuthTokenPayload } from "./auth.type";
import { z } from "zod";
import { loginSchema, refreshTokenSchema } from "./auth.schema";

export async function login(
  ctx: RequestContext,
  dto: z.infer<typeof loginSchema>
) {
  const user = await prisma.user.findUnique({
    where: { username: dto.username },
  });

  if (!user) {
    ctx.logger.error("Invalid username");
    throw new UnauthenticatedError("Invalid username");
  }

  const hashedPassword = hashPassword(dto.password);
  if (user.password !== hashedPassword) {
    ctx.logger.error("Invalid password");
    throw new UnauthenticatedError("Invalid password");
  }

  const { password: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    tokens: {
      accessToken: generateAccessToken(user),
      refreshToken: generateRefreshToken(user),
    },
  };
}

export async function refreshToken(
  ctx: RequestContext,
  { refreshToken }: z.infer<typeof refreshTokenSchema>
) {
  const payload = verifyToken(refreshToken);

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
  });

  if (!user) {
    ctx.logger.error("User not found");
    throw new UnauthenticatedError("User not found");
  }

  return {
    user,
    tokens: {
      accessToken: generateAccessToken(user),
      refreshToken: generateRefreshToken(user),
    },
  };
}

export function verifyToken(token: string) {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined");
  }
  return verify(token, jwtSecret) as AuthTokenPayload;
}

function hashPassword(password: string) {
  return crypto.createHash("sha256").update(password).digest("hex");
}
