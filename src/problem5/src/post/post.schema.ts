import { z } from "zod";
import { orderSchema, paginationSchema } from "../common/common.schema";

export const getPostsSchema = orderSchema.merge(paginationSchema).extend({
  search: z.string().optional(),
});

export const createPostSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export const updatePostSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});
