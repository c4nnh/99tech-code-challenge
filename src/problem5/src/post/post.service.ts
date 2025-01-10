import { z } from "zod";
import { prisma } from "../libs/prisma";
import { RequestContext } from "../types/request-context.type";
import {
  createPostSchema,
  getPostsSchema,
  updatePostSchema,
} from "./post.schema";
import { transformPaginationParams } from "../helpers/transform-pagination-params.helper";
import { Post, Prisma } from "@prisma/client";
import { transformSortParams } from "../helpers/transform-sort-params";
import { ForbiddenError, NotFoundError } from "../error";

export async function getPosts(
  ctx: RequestContext,
  dto: z.infer<typeof getPostsSchema>
) {
  const { skip, take, page, limit } = transformPaginationParams(dto);
  const where: Prisma.PostWhereInput = {
    authorId: ctx.user?.id,
  };

  if (dto.search) {
    where.title = { contains: dto.search };
  }

  const orderBy = transformSortParams<Prisma.PostOrderByWithRelationInput>(dto);

  const [posts, total] = await prisma.$transaction([
    prisma.post.findMany({ where, skip, take, orderBy }),
    prisma.post.count({ where }),
  ]);

  return { total, pagination: { page, limit }, posts };
}

export async function createPost(
  ctx: RequestContext,
  dto: z.infer<typeof createPostSchema>
) {
  const post = await prisma.post.create({
    data: {
      ...dto,
      authorId: ctx.user!.id,
    },
  });

  return post;
}

export async function updatePost(
  ctx: RequestContext,
  postId: string,
  dto: z.infer<typeof updatePostSchema>
) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  assertPostExists(ctx, post);
  assertPostBelongsToUser(ctx, post!);

  const updatedPost = await prisma.post.update({
    where: { id: postId },
    data: dto,
  });

  return updatedPost;
}

export async function deletePost(ctx: RequestContext, postId: string) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  assertPostExists(ctx, post);
  assertPostBelongsToUser(ctx, post!);

  return {
    success: true,
  };
}

function assertPostExists(ctx: RequestContext, post: Post | null) {
  if (!post) {
    ctx.logger.error("Post not found");
    throw new NotFoundError("Post not found");
  }
}

function assertPostBelongsToUser(ctx: RequestContext, post: Post) {
  if (post.authorId !== ctx.user!.id) {
    ctx.logger.error("Post does not belong to user");
    throw new ForbiddenError("Post does not belong to user");
  }
}
