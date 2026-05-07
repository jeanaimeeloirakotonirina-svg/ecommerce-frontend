import React from "react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import VarotraHeader from "./VarotraHeader";
import VarotraFooter from "./VarotraFooter";
import "./App.css";
import "./varotra-theme.css";

export default function App() {
  return (
    <MemoryRouter>
      <div className="varotra-theme">
        <VarotraHeader />

        {/* Contenu principal */}
        <main className="varotra-main-content">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </main>

        <VarotraFooter />
      </div>
    </MemoryRouter>
  );
}