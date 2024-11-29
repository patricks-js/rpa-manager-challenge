import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";

export function DashboardPage() {
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
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {rpas.map((rpa) => (
              <TableRow key={rpa.id}>
                <TableCell>{rpa.id}</TableCell>
                <TableCell>{rpa.nome}</TableCell>
                <TableCell>{rpa.email}</TableCell>
                <TableCell>{rpa.cpf}</TableCell>
                <TableCell>{rpa.dataNascimento}</TableCell>
                <TableCell>{rpa.identity.nacionalidade}</TableCell>
                <TableCell>{rpa.address.estado}</TableCell>
                <TableCell>{rpa.telefone}</TableCell>
                <TableCell>{rpa.nit}</TableCell>
                <TableCell>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Edit className="size-4" />
                    </Button>
                  </SheetTrigger>
                </TableCell>
                <RPAForm />
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
