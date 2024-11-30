import { useAuthStore } from "@/hooks/use-auth-store";
import type { RPA } from "@server/db/schema";

export type RPAs = {
  rpas: RPA[];
};

export async function getRPAs() {
  const { token } = useAuthStore.getState();

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch("http://localhost:3333/api/auth/rpa", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  return data as RPAs;
}
