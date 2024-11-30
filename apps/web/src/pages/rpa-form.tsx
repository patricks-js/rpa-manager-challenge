import { getRPAByCPF } from "@/services/get-rpa-by-cpf";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

export function RpaFormPage() {
  const { cpf } = useParams();

  if (!cpf) {
    return (
      <Navigate
        to="/search-rpa"
        replace
      />
    );
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ["get-rpa-by-cpf"],
    queryFn: async () => {
      const data = await getRPAByCPF(cpf);

      return data;
    },
  });

  if (error) {
    return <div>Erro ao carregar RPA</div>;
  }

  if (isLoading || !data) {
    return <div>Carregando RPA...</div>;
  }

  return <pre>{JSON.stringify(data.rpa, null, 2)}</pre>;
}
