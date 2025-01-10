import { NotFoundError } from "../error";
import { prisma } from "../libs/prisma";
import { RequestContext } from "../types/request-context.type";

export async function getCurrentProfile(ctx: RequestContext) {
  if (!ctx.user) {
    ctx.logger.error("User is not authenticated");
    throw new NotFoundError("User not found");
  }

  const profile = await prisma.user.findUnique({
    where: { id: ctx.user.id },
    select: {
      id: true,
      name: true,
      username: true,
      role: true,
    },
  });

  if (!profile) {
    ctx.logger.error("User not found");
    throw new NotFoundError("User not found");
  }

  return profile;
}
