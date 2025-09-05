import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import { RecoilRoot } from "recoil";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <AuthProvider>
          <App />
        </AuthProvider>
      </RecoilRoot>
    </BrowserRouter>
  </StrictMode>
);
