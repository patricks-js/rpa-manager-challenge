import { RpaEditForm } from "@/components/rpa-edit-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getRPAs } from "@/services/get-rpas";
import { useQuery } from "@tanstack/react-query";
import { Loader, Search } from "lucide-react";
import { useState } from "react";

export function DashboardPage() {
  const [selectedRPA, setSelectedRPA] = useState<number>(0);

  const { data, error, isLoading } = useQuery({
    queryKey: ["fetch-rpas"],
    queryFn: getRPAs,
  });

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold mb-10">Dashboard</h1>
        <div>Erro ao carregar RPAs</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-10">Dashboard</h1>
      <div className="space-y-4">
        <header className="flex justify-between items-center">
          <form className="flex gap-2 max-w-xl">
            <Input
              type="text"
              placeholder="Search..."
              // value={keyword}
              // onChange={(e) => setKeyword(e.target.value)}
              className="flex-1"
            />
            <Button
              size="icon"
              type="submit"
            >
              <Search className="size-4" />
            </Button>
          </form>
          <SheetTrigger asChild>
            <Button>Adicionar RPA</Button>
          </SheetTrigger>
        </header>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Data de Nascimento</TableHead>
              <TableHead>Nacionalidade</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>NIT</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <div className="w-full h-full flex justify-center items-center">
                <Loader className="size-6 animate-spin" />
              </div>
            ) : (
              data?.rpas.map((rpa) => (
                <div key={rpa.id}>
                  <SheetTrigger
                    asChild
                    onClick={() => setSelectedRPA(rpa.id)}
                  >
                    <TableRow
                      key={rpa.id}
                      className="h-12"
                    >
                      <TableCell>{rpa.id}</TableCell>
                      <TableCell>{rpa.nome}</TableCell>
                      <TableCell>{rpa.email}</TableCell>
                      <TableCell>{rpa.cpf}</TableCell>
                      <TableCell>{rpa.dataNascimento}</TableCell>
                      <TableCell>{rpa.nacionalidade}</TableCell>
                      <TableCell>{rpa.estado}</TableCell>
                      <TableCell>{rpa.telefone}</TableCell>
                      <TableCell>{rpa.nit}</TableCell>
                    </TableRow>
                  </SheetTrigger>
                </div>
              ))
            )}
          </TableBody>
        </Table>
        <RpaEditForm rpaId={selectedRPA} />
      </div>
    </div>
  );
}
