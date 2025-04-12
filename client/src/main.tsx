import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter as Router } from "react-router-dom";

import { Buffer } from "buffer";
window.Buffer = Buffer;
import process from "process";
window.process = process;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='system' storageKey="vite-ui-theme">
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </StrictMode>
);
