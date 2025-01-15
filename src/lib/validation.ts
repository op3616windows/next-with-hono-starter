import { MiddlewareHandler } from "hono";
import { z, ZodSchema } from "zod";
import { createErrorResponse } from "./error-response";
import { VALIDATION_ERROR } from "./errors";

type ValidationSchema<
  TJson = unknown,
  TQuery = Record<string, string | string[]>,
  TParams = Record<string, string>
> = {
  json?: ZodSchema<TJson>;
  query?: ZodSchema<TQuery>;
  params?: ZodSchema<TParams>;
};
export const validate = <
  TJson = unknown,
  TQuery = Record<string, string | string[]>,
  TParams = Record<string, string>
>(
  schema: ValidationSchema<TJson, TQuery, TParams>
): MiddlewareHandler<{
  Variables: {
    validatedJson: TJson;
    validatedQuery: TQuery;
    validatedParams: TParams;
  };
}> => {
  return async (c, next) => {
    try {
      if (schema.json) {
        const body = await c.req.json().catch(() => ({}));
        const validatedJson = schema.json.parse(body);
        c.set("validatedJson", validatedJson);
      }

      if (schema.query) {
        const query = c.req.query();
        const validatedQuery = schema.query.parse(query);
        c.set("validatedQuery", validatedQuery);
      }

      if (schema.params) {
        const params = c.req.param();
        const validatedParams = schema.params.parse(params);
        c.set("validatedParams", validatedParams);
      }

      await next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        const details = err.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        }));
        return createErrorResponse(
          c,
          VALIDATION_ERROR,
          "Validation failed",
          details,
          400
        );
      }
      throw err;
    }
  };
};
