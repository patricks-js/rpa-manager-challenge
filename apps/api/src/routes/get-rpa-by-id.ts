import { db } from "@/db/index";
import { rpa } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Hono } from "hono";

export const getRpaByIdRoute = new Hono().get("/:rpaId{[0-9]+}", async (c) => {
  const rpaId = Number.parseInt(c.req.param("rpaId"));

  const foundRpa = await db
    .select({
      id: rpa.id,
      nome: rpa.nome,
      cpf: rpa.cpf,
      dataNascimento: rpa.dataNascimento,
      estadoCivil: rpa.estadoCivil,
      numeroDependentes: rpa.numeroDependentes,
      telefone: rpa.telefone,
      email: rpa.email,
      numeroContribuinte: rpa.numeroContribuinte,
      categoriaAutonomo: rpa.categoriaAutonomo,
      cboAutonomo: rpa.cboAutonomo,
      codigoReceita: rpa.codigoReceita,
      nit: rpa.nit,
      identity: {
        identidadeNumero: rpa.identidadeNumero,
        orgaoEmissor: rpa.orgaoEmissor,
        estadoEmissor: rpa.estadoEmissor,
        nacionalidade: rpa.nacionalidade,
      },
      address: {
        cep: rpa.cep,
        rua: rpa.rua,
        numero: rpa.numero,
        complemento: rpa.complemento,
        bairro: rpa.bairro,
        estado: rpa.estado,
        municipio: rpa.municipio,
      },
    })
    .from(rpa)
    .where(eq(rpa.id, rpaId));

  if (!foundRpa[0]) {
    return c.json({ error: "Not Found" }, 404);
  }

  return c.json({ rpa: foundRpa[0] }, 200);
});
