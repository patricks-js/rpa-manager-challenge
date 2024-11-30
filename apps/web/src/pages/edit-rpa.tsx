import { EditRPAForm } from "@/components/edit-rpa-form";
import { getRPAByCPF } from "@/services/get-rpa-by-cpf";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

export function EditRpaPage() {
  const { cpf } = useParams();

  if (!cpf) {
    return <Navigate to="/" />;
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-rpa-by-cpf"],
    queryFn: async () => {
      const response = await getRPAByCPF(cpf);
      return response;
    },
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar dados: {error.message}</div>;
  }

  if (data) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center py-20 gap-10">
        <h1 className="text-2xl font-bold">Editar RPA</h1>
        <EditRPAForm rpa={data.rpa} />
      </div>
    );
  }

  return null;
}
