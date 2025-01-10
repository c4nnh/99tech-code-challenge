import { z } from "zod";

export const paginationSchema = z.object({
  page: z
    .number({
      coerce: true,
    })
    .optional(),
  limit: z
    .number({
      coerce: true,
    })
    .optional(),
});

export const orderSchema = z.object({
  orderBy: z.string().optional(),
  orderDesc: z.enum(["asc", "desc"]).optional(),
});
