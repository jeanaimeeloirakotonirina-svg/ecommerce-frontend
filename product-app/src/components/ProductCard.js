import React from "react";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const [imageError, setImageError] = React.useState(false);

  const addToCart = () => {
    window.dispatchEvent(
      new CustomEvent("ADD_TO_CART", { detail: product })
    );
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={imageError ? "https://via.placeholder.com/300x300?text=Image+non+disponible" : (product?.image || "https://via.placeholder.com/300x300")}
          alt={product?.name}
          className="product-image"
          onError={handleImageError}
        />
      </div>

      <div className="product-info">
        <h3 className="product-title">{product?.name}</h3>

        <div className="product-price">
          <span className="price-symbol">MGA</span>
          <span className="price-whole">{Math.floor(product?.price || 0)}</span>
          <span className="price-fraction">{((product?.price || 0) % 1 * 100).toFixed(0).padStart(2, '0')}</span>
        </div>

        <div className="product-rating">
          <div className="stars">
            ★★★★☆
          </div>
          <span className="rating-count">(1,234)</span>
        </div>

        <button className="add-to-cart-btn" onClick={addToCart}>
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}