import { db } from "@/db/index.js";
import { rpa } from "@/db/schema.js";
import { eq } from "drizzle-orm";
import { Hono } from "hono";

export const getRpaByIdRoute = new Hono().get("/:rpaId", async (c) => {
  const { rpaId } = c.req.param();

  const [foundRpa] = await db
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
    .where(eq(rpa.id, Number.parseInt(rpaId)));

  if (!foundRpa) {
    return c.json({ message: "RPA não encontrada." }, 404);
  }

  return c.json({ rpa: foundRpa });
});
