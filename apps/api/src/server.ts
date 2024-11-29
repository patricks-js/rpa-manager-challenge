import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono();

app.use("*", logger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const port = 3333;

serve({
  fetch: app.fetch,
  port,
});
