import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

import { UserProvider } from "./context/UserContext.js";
import ThemeProvider from "./context/ThemeContext.tsx";
import ProjectProvider from "./context/ProjectContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ThemeProvider>
          <ProjectProvider>
            <App />
          </ProjectProvider>
        </ThemeProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
