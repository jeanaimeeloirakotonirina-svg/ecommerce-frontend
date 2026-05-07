import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");

// Utiliser une variable globale pour éviter les appels multiples à createRoot
if (!window.reactRoot) {
  window.reactRoot = ReactDOM.createRoot(container);
}

window.reactRoot.render(<App />);