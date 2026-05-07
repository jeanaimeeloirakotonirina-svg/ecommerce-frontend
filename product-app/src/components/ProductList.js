import React from "react";
import useProducts from "../hooks/useProducts";
import ProductCard from "./ProductCard";
import "./ProductList.css";

export default function ProductList() {
  const { products, isFallback } = useProducts();

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h1>Résultats de recherche</h1>
        {isFallback && (
          <div className="fallback-notice">
            ⚠️ Mode hors ligne (produits par défaut)
          </div>
        )}
      </div>

      {products.length === 0 ? (
        <div className="loading-container">
          <p>Chargement des produits…</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}