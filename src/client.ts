import { hc } from "hono/client";
import type { AppType } from "./server";

const client = hc<AppType>(
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
);

export default client;
