import { db } from "@/db/index.js";
import { users } from "@/db/schema.js";
import { env } from "@/env.js";
import { zValidator } from "@hono/zod-validator";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { ZodError, z } from "zod";

const bodySchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const loginRoute = new Hono().post(
  "/",
  zValidator("json", bodySchema),
  async (c) => {
    try {
      const { username, password } = c.req.valid("json");

      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.usuario, username));

      if (!user) {
        return c.json({ message: "Credenciais inválidas" }, 401);
      }

      const passwordMath = await bcrypt.compare(password, user.senha);

      if (!passwordMath) {
        return c.json({ message: "Credenciais inválidas" }, 401);
      }

      const payload = {
        sub: user.id,
        username: user.usuario,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + 60 * 30, // Token expires in 30 minutes
      };

      const token = await sign(payload, env.JWT_SECRET);

      return c.json({ token });
    } catch (error) {
      if (error instanceof ZodError) {
        return c.json({ message: error.flatten().fieldErrors }, 400);
      }

      return c.json({ message: "Erro ao fazer login" }, 500);
    }
  },
);
