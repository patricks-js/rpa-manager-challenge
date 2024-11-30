import { createBrowserRouter } from "react-router-dom";

import { LoginPage } from "@/pages/login";
import { ProtectedRoutesWrapper } from "@/pages/protected-routes-wrapper";
import { HomePage } from "./pages/home";
import { RpaFormPage } from "./pages/rpa-form";
import { SearchRPAPage } from "./pages/search-rpa";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutesWrapper />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/search-rpa",
        element: <SearchRPAPage />,
      },
      {
        path: "/rpa-form/:cpf",
        element: <RpaFormPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
