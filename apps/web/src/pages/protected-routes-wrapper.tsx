import { Navigate, Outlet } from "react-router-dom";

import { Sheet } from "@/components/ui/sheet";
import { useAuthStore } from "@/hooks/use-auth-store";

export function ProtectedRoutesWrapper() {
  const { token } = useAuthStore.getState();

  if (!token) {
    return (
      <Navigate
        to={"/login"}
        replace
      />
    );
  }

  return (
    <Sheet>
      <Outlet />
    </Sheet>
  );
}
