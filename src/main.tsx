import "./shared/styles/global.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App.tsx";

import { Settings } from "luxon";

Settings.defaultZone = "America/Sao_Paulo";
Settings.defaultLocale = "pt-BR";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
