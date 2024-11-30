import { db } from "@/db/index";
import { rpa } from "@/db/schema";
import { faker } from "@faker-js/faker";

function generateTestRecord(): typeof rpa.$inferInsert {
  return {
    nome: faker.person.fullName(),
    cpf: faker.number.int({ min: 10000000000, max: 99999999999 }).toString(),
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    dataNascimento: faker.date
      .birthdate({ min: 18, max: 65, mode: "age" })
      .toISOString()
      .split("T")[0]!,
    estadoCivil: faker.helpers.arrayElement([
      "Solteiro",
      "Casado",
      "Divorciado",
      "Viúvo",
    ]),
    identidadeNumero: faker.number
      .int({ min: 100000000, max: 999999999 })
      .toString(),
    orgaoEmissor: faker.helpers.arrayElement(["SSP", "SDS", "DETRAN"]),
    estadoEmissor: faker.helpers.arrayElement(["SP", "PE"]),
    numeroDependentes: faker.number.int({ min: 0, max: 5 }),
    nacionalidade: "Brasileiro",
    cep: faker.location.zipCode(),
    rua: faker.location.street(),
    numero: faker.number.int({ min: 1000, max: 9999 }).toString(),
    complemento: faker.helpers.arrayElement(["", "Apto 2", "Bloco B"]),
    bairro: faker.location.street(),
    estado: faker.location.state(),
    municipio: faker.location.city(),
    telefone: faker.phone.number({ style: "national" }),
    email: faker.internet.email(),
    numeroContribuinte: faker.number.int({ min: 10000, max: 99999 }).toString(),
    categoriaAutonomo: faker.helpers.arrayElement([
      "Freelancer",
      "Consultor",
      "Palestrante",
      "Web Designer",
      "Desenvolvedor",
    ]),
    cboAutonomo: faker.number.int({ min: 100000, max: 999999 }).toString(),
    codigoReceita: faker.number.int({ min: 1000, max: 9999 }).toString(),
    nit: faker.number.int({ min: 100000000, max: 999999999 }).toString(),
  };
}

export async function createFakeRpas() {
  const rpas: (typeof rpa.$inferInsert)[] = [];

  for (let i = 0; i < 12; i++) {
    rpas.push(generateTestRecord());
  }

  const records = await db.select({ id: rpa.id }).from(rpa);

  if (records.length > 0) {
    console.log("RPAs já existem no banco de dados.");
    return;
  }

  await db.insert(rpa).values(rpas).execute();
}
