import { db } from "@/db/index.js";
import { rpa } from "@/db/schema.js";
import { Hono } from "hono";

export const fetchAllRpasRoute = new Hono().get("/", async (c) => {
  const rpas = await db
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
    .limit(10)
    .offset(0);

  if (rpas.length === 0) {
    return c.json({ message: "Nenhuma RPA encontrada." });
  }

  return c.json({ rpas });
});
