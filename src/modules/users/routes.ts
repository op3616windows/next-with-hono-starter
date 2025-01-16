import { Hono } from "hono";

import {
  createErrorResponse,
  createSuccessResponse,
} from "@/lib/error-response";
import { AppError, NOT_FOUND_ERROR } from "@/lib/errors";
import { validate } from "@/lib/validation";

import {
  createUserSchema,
  deleteUserSchema,
  updateUserSchema,
} from "./schemas";
import { createUser, deleteUser, getUsers, updateUser } from "./services";

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
  })
  .put("/", validate({ json: updateUserSchema }), async (c) => {
    try {
      const userData = c.get("validatedJson");
      const user = await updateUser(userData);

      if (!user) {
        throw new AppError(NOT_FOUND_ERROR, "User not found", undefined, 404);
      }

      return createSuccessResponse(c, user);
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
  .delete("/", validate({ json: deleteUserSchema }), async (c) => {
    try {
      const userData = c.get("validatedJson");
      const user = await deleteUser(userData);

      if (!user) {
        throw new AppError(NOT_FOUND_ERROR, "User not found", undefined, 404);
      }

      return createSuccessResponse(c, user);
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
