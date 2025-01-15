import { Context } from "hono";
import { ContentfulStatusCode } from "hono/utils/http-status";

type SuccessResponse<T> = {
  success: true;
  data: T;
  meta?: Record<string, unknown>;
};

type ErrorResponse = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Array<{ field?: string; message: string }>;
  };
};

export const createSuccessResponse = <T>(
  c: Context,
  data: T,
  meta?: Record<string, unknown>,
  statusCode: number = 200
) => {
  const response: SuccessResponse<T> = { success: true, data };
  if (meta) response.meta = meta;
  return c.json(response, statusCode as ContentfulStatusCode);
};

export const createErrorResponse = (
  c: Context,
  code: string,
  message: string,
  details?: Array<{ field?: string; message: string }>,
  statusCode: number = 400
) => {
  const response: ErrorResponse = {
    success: false,
    error: { code, message, details },
  };
  return c.json(response, statusCode as ContentfulStatusCode);
};
