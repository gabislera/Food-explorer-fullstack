import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Routes } from "./routes";
import { AuthProvider } from "./hooks/auth";
import { ActiveProvider } from "./hooks/active";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ActiveProvider>
        <Routes />
      </ActiveProvider>
    </AuthProvider>
  </React.StrictMode>
);
