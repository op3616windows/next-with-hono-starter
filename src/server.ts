import { Hono } from "hono";

import { errorHandler } from "@/lib/error-handler";

import userRoutes from "@/modules/users/routes";

const app = new Hono().basePath("/api");

app.onError(errorHandler);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route("/users", userRoutes);

export type AppType = typeof routes;

export default app;
