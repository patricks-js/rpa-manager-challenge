import { createBrowserRouter } from "react-router-dom";

import { LoginPage } from "@/pages/login";
import { ProtectedRoutesWrapper } from "@/pages/protected-routes-wrapper";
import { EditRpaPage } from "./pages/edit-rpa";
import { HomePage } from "./pages/home";
import { RegisterRpaPage } from "./pages/register-rpa";

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
        path: "/edit-rpa/:cpf",
        element: <EditRpaPage />,
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
