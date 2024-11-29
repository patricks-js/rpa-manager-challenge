import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer().primaryKey().notNull(),
  usuario: text().notNull(),
  senha: text().notNull(),
  nomeColigada: text("nome_coligada").notNull(),
  nomeFilial: text("nome_filial").notNull(),
  email: text().unique().notNull(),
  nomeCompleto: text("nome_completo").notNull(),
  telefone: text("telefone").notNull(),
});

export const rpa = sqliteTable("rpa", {
  id: integer().primaryKey().notNull(),
  nome: text().notNull(),
  cpf: text().notNull().unique(),
  dataNascimento: text("data_nascimento").notNull(),
  estadoCivil: text("estado_civil"),
  identidadeNumero: text("identidade_numero").notNull(),
  orgaoEmissor: text("orgao_emissor").notNull(),
  estadoEmissor: text("estado_emissor").notNull(),
  numeroDependentes: integer("numero_dependentes"),
  nacionalidade: text().notNull(),
  cep: text().notNull(),
  rua: text().notNull(),
  numero: text().notNull(),
  complemento: text().notNull(),
  bairro: text().notNull(),
  estado: text().notNull(),
  municipio: text().notNull(),
  telefone: text().notNull(),
  email: text().unique().notNull(),
  numeroContribuinte: text().notNull(),
  categoriaAutonomo: text().notNull(),
  cboAutonomo: text().notNull(),
  codigoReceita: text().notNull(),
  nit: text().notNull(),
});
