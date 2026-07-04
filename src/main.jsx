import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { AppContextProvider } from "./context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </AuthProvider>,
  // <StrictMode>
  // </StrictMode>,
);
