import type { ApiRoutes } from "@server/server";
import { hc } from "hono/client";

const client = hc<ApiRoutes>("http://localhost:3333/");

export const api = client.api;
