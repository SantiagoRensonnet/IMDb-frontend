import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MoviesProvider } from "./contexts/movies.context.tsx";
import { QueryProvider } from "./contexts/query.context.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MoviesProvider>
      <QueryProvider>
        <App />
      </QueryProvider>
    </MoviesProvider>
  </React.StrictMode>
);
