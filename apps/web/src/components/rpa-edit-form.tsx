import type { RPA } from "@server/db/schema";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";

type RPAEditFromProps = {
  rpaId: number;
};

async function getRpaById(id: number) {
  const response = await fetch(`http://localhost:3333/rpa/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  return data as RPA;
}

export function RpaEditForm({ rpaId }: RPAEditFromProps) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["get-rpa", rpaId],
    queryFn: () => getRpaById(rpaId),
  });

  if (error) {
    return <div>Erro ao carregar RPA</div>;
  }

  if (isLoading) {
    return <div>Carregando RPA...</div>;
  }

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Editar RPA</SheetTitle>
      </SheetHeader>
      <form className="space-y-4">
        <div>
          <label
            htmlFor="nome"
            className="block text-sm font-medium text-gray-700"
          >
            Nome
          </label>
          <Input
            id="nome"
            type="text"
            defaultValue={data?.nome}
            className="mt-1"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            defaultValue={data?.email}
            className="mt-1"
          />
        </div>
        <div>
          <label
            htmlFor="cpf"
            className="block text-sm font-medium text-gray-700"
          >
            CPF
          </label>
          <Input
            id="cpf"
            type="text"
            defaultValue={data?.cpf}
            className="mt-1"
          />
        </div>
        <div>
          <label
            htmlFor="nacionalidade"
            className="block text-sm font-medium text-gray-700"
          >
            Nacionalidade
          </label>
          <Input
            id="nacionalidade"
            type="text"
            defaultValue={data?.nacionalidade}
            className="mt-1"
          />
        </div>
        <div>
          <label
            htmlFor="estado"
            className="block text-sm font-medium text-gray-700"
          >
            Estado
          </label>
          <Input
            id="estado"
            type="text"
            defaultValue={data?.estado}
            className="mt-1"
          />
        </div>
        <div>
          <label
            htmlFor="telefone"
            className="block text-sm font-medium text-gray-700"
          >
            Telefone
          </label>
          <Input
            id="telefone"
            type="text"
            defaultValue={data?.telefone}
            className="mt-1"
          />
        </div>
        <div>
          <label
            htmlFor="nit"
            className="block text-sm font-medium text-gray-700"
          >
            NIT
          </label>
          <Input
            id="nit"
            type="text"
            defaultValue={data?.nit}
            className="mt-1"
          />
        </div>
        <Button
          type="submit"
          className="mt-4"
        >
          Salvar
        </Button>
      </form>
    </SheetContent>
  );
}
