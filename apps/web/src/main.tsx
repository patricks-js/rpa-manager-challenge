import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app.tsx";
import "./globals.css";

const root = document.getElementById("root");

if (!root) throw new Error("root element not found");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
