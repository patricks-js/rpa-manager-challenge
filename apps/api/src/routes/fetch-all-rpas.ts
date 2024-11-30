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
      identidadeNumero: rpa.identidadeNumero,
      orgaoEmissor: rpa.orgaoEmissor,
      estadoEmissor: rpa.estadoEmissor,
      nacionalidade: rpa.nacionalidade,
      cep: rpa.cep,
      rua: rpa.rua,
      numero: rpa.numero,
      complemento: rpa.complemento,
      bairro: rpa.bairro,
      estado: rpa.estado,
      municipio: rpa.municipio,
    })
    .from(rpa);

  return c.json({ rpas }, 200);
});
