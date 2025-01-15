import { Hono } from "hono";

import {
  createErrorResponse,
  createSuccessResponse,
} from "@/lib/error-response";
import { AppError } from "@/lib/errors";
import { validate } from "@/lib/validation";

import { createUserSchema } from "./schemas";
import { createUser, getUsers } from "./services";

const userRoutes = new Hono()
  .get("/", async (c) => {
    try {
      const user = await getUsers();

      return createSuccessResponse(c, user, undefined, 200);
    } catch (err) {
      if (err instanceof AppError) {
        return createErrorResponse(
          c,
          err.code,
          err.message,
          err.details,
          err.statusCode
        );
      }

      throw err;
    }
  })
  .post("/", validate({ json: createUserSchema }), async (c) => {
    try {
      const userData = c.get("validatedJson");

      const user = await createUser(userData);

      return createSuccessResponse(c, user, undefined, 201);
    } catch (err) {
      if (err instanceof AppError) {
        return createErrorResponse(
          c,
          err.code,
          err.message,
          err.details,
          err.statusCode
        );
      }

      throw err;
    }
  });

export default userRoutes;
