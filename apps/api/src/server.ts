import { env } from "@/env.js";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { type JwtVariables, jwt } from "hono/jwt";
import { logger } from "hono/logger";
import { fetchAllRpasRoute } from "./routes/fetch-all-rpas.js";
import { loginRoute } from "./routes/login.js";
import { registerRpaRoute } from "./routes/register-rpa.js";
import { createAdminUSer } from "./scripts/create-admin-user.js";
import { createFakeRpas } from "./scripts/create-fake-rpas.js";

export type Variables = JwtVariables<{
  sub: number;
  username: string;
  email: string;
}>;

const app = new Hono<{ Variables: Variables }>();

app.use("*", logger());
app.use("/auth/*", jwt({ secret: env.JWT_SECRET }));

app.route("/login", loginRoute);
app.route("/auth/rpa", registerRpaRoute);
app.route("/auth/rpa", fetchAllRpasRoute);

const port = 3333;
console.log(`Server is running on http://localhost:${port}`);

await createAdminUSer();
await createFakeRpas();

serve({
  fetch: app.fetch,
  port,
});
