import { z } from "zod";
import { orderSchema } from "../common/common.schema";

export function transformSortParams<T extends { createdAt?: string }>(
  dto: z.infer<typeof orderSchema>
) {
  const orderBy: Record<keyof T, "asc" | "desc"> = {} as Record<
    keyof T,
    "asc" | "desc"
  >;
  if (dto.orderBy) {
    orderBy[dto.orderBy as keyof T] = dto.orderDesc === "desc" ? "desc" : "asc";
  } else {
    orderBy.createdAt = "desc";
  }
  return orderBy as T;
}
