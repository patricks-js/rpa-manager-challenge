import { createBrowserRouter } from "react-router-dom";

import { LoginPage } from "@/pages/login";
import { ProtectedRoutesWrapper } from "@/pages/protected-routes-wrapper";
import { HomePage } from "./pages/home";
import { RegisterRpaPage } from "./pages/register-rpa";
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
      {
        path: "/register-rpa",
        element: <RegisterRpaPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
