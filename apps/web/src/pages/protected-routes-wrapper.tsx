import { Navigate, Outlet } from "react-router-dom";

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
    <div className="container mx-auto">
      <Outlet />
    </div>
  );
}
