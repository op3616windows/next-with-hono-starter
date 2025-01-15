export class AppError extends Error {
  constructor(
    public code: string,
    public message: string,
    public details?: Array<{ field?: string; message: string }>,
    public statusCode: number = 400
  ) {
    super(message);
  }
}

export const VALIDATION_ERROR = "VALIDATION_ERROR";
export const CONFLICT = "CONFLICT";
export const NOT_FOUND_ERROR = "NOT_FOUND_ERROR";
export const INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR";
