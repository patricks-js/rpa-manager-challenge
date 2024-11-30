import { db } from "@/db/index.js";
import { rpa } from "@/db/schema.js";
import { formatDateToSQLite } from "@/utils/format-date-to-sqlite.js";
import { isValidCPF } from "@/utils/validate-cpf.js";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { ZodError, z } from "zod";

const bodySchema = z.object({
  nome: z.string().optional(),
  cpf: z.string().optional(),
  dataNascimento: z.coerce.date().optional(),
  estadoCivil: z.string().optional(),
  numeroDependentes: z.coerce.number().optional(),
  nacionalidade: z.string().optional(),
  cep: z.string().optional(),
  rua: z.string().optional(),
  numero: z.string().optional(),
  complemento: z.string().optional(),
  bairro: z.string().optional(),
  estado: z.string().optional(),
  municipio: z.string().optional(),
  telefone: z.string().optional(),
  categoriaAutonomo: z.string().optional(),
});

export const updateRpaRoute = new Hono().put(
  "/:rpaId{[0-9]+}",
  zValidator("json", bodySchema),
  async (c) => {
    try {
      const rpaId = Number.parseInt(c.req.param("rpaId"));

      const [foundRpa] = await db
        .select({ id: rpa.id })
        .from(rpa)
        .where(eq(rpa.id, rpaId));

      if (!foundRpa) {
        return c.json({ message: "RPA não encontrada." }, 404);
      }

      const body = c.req.valid("json");

      if (body.cpf && !isValidCPF(body.cpf)) {
        return c.json({ message: "CPF é inválido" }, 400);
      }

      const toUpdateFields = Object.fromEntries(
        Object.entries(body).filter(([_, value]) => value !== undefined),
      );

      if (toUpdateFields.dataNascimento) {
        toUpdateFields.dataNascimento = formatDateToSQLite(
          new Date(toUpdateFields.dataNascimento),
        );
      }

      if (Object.keys(toUpdateFields).length === 0) {
        return c.json(
          { message: "Nenhum campo válido para atualizar foi enviado." },
          400,
        );
      }

      await db.update(rpa).set(toUpdateFields).where(eq(rpa.id, rpaId));

      return c.json({ message: "RPA atualizada com sucesso." });
    } catch (error) {
      if (error instanceof ZodError) {
        return c.json({ message: "Erro de validação" }, 400);
      }

      console.log(error);

      return c.json({ message: "Erro ao atualizar RPA" }, 500);
    }
  },
);
