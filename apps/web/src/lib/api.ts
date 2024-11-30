import { hc } from "hono/client";
import type { ApiRoutes } from "../../../api/src/server";

const client = hc<ApiRoutes>("http://localhost:3333/");

export const api = client.api;
