import { z } from "zod";
import { paginationSchema } from "../common/common.schema";

export function transformPaginationParams(
  params: z.infer<typeof paginationSchema>
) {
  const page = params.page || 1;
  const limit = params.limit || 10;

  return {
    skip: (page - 1) * limit,
    take: limit,
    page,
    limit,
  };
}
