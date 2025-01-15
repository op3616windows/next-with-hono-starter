import { Context } from "hono";
import { AppError, INTERNAL_SERVER_ERROR } from "./errors";
import { createErrorResponse } from "./error-response";

export const errorHandler = (err: Error, c: Context) => {
  if (err instanceof AppError) {
    return createErrorResponse(
      c,
      err.code,
      err.message,
      err.details,
      err.statusCode
    );
  }

  return createErrorResponse(
    c,
    INTERNAL_SERVER_ERROR,
    "Internal Server Error",
    undefined,
    500
  );
};
