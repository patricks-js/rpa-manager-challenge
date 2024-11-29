import { config } from "dotenv";
import { z } from "zod";

config({
  path: "./.env.local",
});

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string().min(1),
});

export const env = envSchema.parse(process.env);
