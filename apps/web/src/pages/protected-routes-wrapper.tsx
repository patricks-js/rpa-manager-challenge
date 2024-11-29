import { Outlet } from "react-router-dom";

import { Sheet } from "@/components/ui/sheet";

export function ProtectedRoutesWrapper() {
  return (
    <Sheet>
      <Outlet />
    </Sheet>
  );
}
