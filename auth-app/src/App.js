import React from "react";
import Login from "./components/Login";
import VarotraHeader from "./VarotraHeader";
import VarotraFooter from "./VarotraFooter";
import "./varotra-theme.css";

export default function App() {
  return (
    <div className="varotra-theme">
      <VarotraHeader />
      <main className="varotra-main-content">
        <Login />
      </main>
      <VarotraFooter />
    </div>
  );
}