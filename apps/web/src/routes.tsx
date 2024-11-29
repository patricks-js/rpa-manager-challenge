import { createBrowserRouter } from "react-router-dom";

import { DashboardPage } from "@/pages/dashboard";
import { LoginPage } from "@/pages/login";
import { ProtectedRoutesWrapper } from "@/pages/protected-routes-wrapper";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutesWrapper />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
