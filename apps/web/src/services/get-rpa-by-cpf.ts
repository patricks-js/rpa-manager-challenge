import { useAuthStore } from "@/hooks/use-auth-store";
import { api } from "@/lib/api";
import type { RPA } from "@server/db/schema";

type RPAByCPFResponse = {
  rpa: RPA;
};

export async function getRPAByCPF(cpf: string) {
  const { token } = useAuthStore.getState();

  const response = await api.auth.rpa[":cpf"].$get(
    { param: { cpf } },
    {
      headers: {
        Authorization: `Bearer ${token}}`,
      },
    },
  );

  if (response.status === 404) {
    throw new Error("RPA não encontrada");
  }

  const data = await response.json();

  return data as RPAByCPFResponse;
}
