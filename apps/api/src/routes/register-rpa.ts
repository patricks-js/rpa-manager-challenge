import { db } from "@/db/index";
import { rpa } from "@/db/schema";
import type { Variables } from "@/server";
import { formatDateToSQLite } from "@/utils/format-date-to-sqlite";
import { isValidCPF } from "@/utils/validate-cpf";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ZodError, z } from "zod";

const bodySchema = z.object({
  nome: z.string(),
  cpf: z.string(),
  dataNascimento: z.coerce.date(),
  estadoCivil: z.string(),
  identidadeNumero: z.string(),
  orgaoEmissor: z.string(),
  estadoEmissor: z.string(),
  numeroDependentes: z.coerce.number().positive(),
  nacionalidade: z.string(),
  cep: z.string(),
  rua: z.string(),
  numero: z.string(),
  complemento: z.string(),
  bairro: z.string(),
  estado: z.string(),
  municipio: z.string(),
  telefone: z.string(),
  email: z.string(),
  numeroContribuinte: z.string(),
  categoriaAutonomo: z.string(),
  cboAutonomo: z.string(),
  codigoReceita: z.string(),
  nit: z.string(),
});

export const registerRpaRoute = new Hono<{ Variables: Variables }>().post(
  "/",
  zValidator("json", bodySchema),
  async (c) => {
    try {
      const body = c.req.valid("json");

      if (!isValidCPF(body.cpf)) {
        return c.json({ message: "CPF é inválido" }, 400);
      }

      await db.insert(rpa).values({
        ...body,
        dataNascimento: formatDateToSQLite(body.dataNascimento),
      });

      return c.json({ message: "RPA cadastrada com sucesso" }, 201);
    } catch (error) {
      if (error instanceof ZodError) {
        return c.json({ message: "Erro de validação" }, 400);
      }

      return c.json({ message: "Erro ao cadastrar RPA" }, 500);
    }
  },
);
