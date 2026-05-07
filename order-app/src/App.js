import React from "react";
import OrderPage from "./components/OrderPage";
import VarotraHeader from "./VarotraHeader";
import VarotraFooter from "./VarotraFooter";
import "./varotra-theme.css";

export default function App() {
  return (
    <div className="varotra-theme">
      <VarotraHeader />
      <main className="varotra-main-content">
        <OrderPage />
      </main>
      <VarotraFooter />
    </div>
  );
}