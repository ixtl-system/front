import "./shared/styles/global.css";

import { Settings } from "luxon";
import { createRoot } from "react-dom/client";

import { App } from "./App.tsx";

Settings.defaultZone = "America/Sao_Paulo";
Settings.defaultLocale = "pt-BR";

createRoot(document.getElementById("root")!).render(
  <App />
);
