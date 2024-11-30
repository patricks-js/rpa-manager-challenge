import { db } from "@/db/index";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export async function createAdminUSer() {
  try {
    const existingUser = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.usuario, "patrick"));

    if (existingUser.length > 0) {
      console.log("Usuário já existe.");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin", 10);

    await db
      .insert(users)
      .values({
        usuario: "patrick",
        nomeCompleto: "Lucas Patrick",
        email: "patrick@admin.com",
        senha: hashedPassword,
        nomeColigada: "XYZ Serviços",
        nomeFilial: "Filial Central",
        telefone: "(11) 99999-9999",
      })
      .execute();

    console.log("Usuário criado com sucesso.");
  } catch (error) {
    console.error("Erro ao criar o usuário");
  }
}
