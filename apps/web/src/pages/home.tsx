import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div className="grid place-items-center min-h-screen">
      <div className="flex items-center gap-4">
        <Button asChild>
          <Link to="/search-rpa">Registrar RPA</Link>
        </Button>
        <Button asChild>
          <Link to="/search-rpa">Buscar RPA por CPF</Link>
        </Button>
      </div>
    </div>
  );
}
