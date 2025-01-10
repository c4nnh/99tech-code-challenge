import { z, ZodSchema } from "zod";
import { BadRequestError } from "../error";

export function parseRequestPayload<T>({
  schema,
  payload,
}: {
  schema: ZodSchema<T>;
  payload: unknown;
}): T {
  const result = schema.safeParse(payload);

  if (!result.success) {
    const metadata = result.error.issues.reduce((acc, issue) => {
      const path = issue.path[0];
      const messages = acc[path] || [];

      return {
        ...acc,
        [path]: [...messages, issue.message],
      };
    }, {} as Record<string, string[]>);

    throw new BadRequestError("Bad request", metadata);
  }

  return result.data;
}
