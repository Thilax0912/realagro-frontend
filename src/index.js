// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// NOTE: CSS is already imported inside App.jsx,
// so we don't need to import it here again.

const container = document.getElementById("root");

// Safety check in case #root is missing for some reason
if (!container) {
  throw new Error("Root element with id 'root' not found in index.html");
}

const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
