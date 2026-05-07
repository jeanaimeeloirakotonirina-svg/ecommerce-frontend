import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./CartItem.css";

export default function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useContext(CartContext);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img
          src={item.image || "https://via.placeholder.com/120x120"}
          alt={item.name}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/120x120?text=Image+non+disponible";
          }}
        />
      </div>

      <div className="cart-item-details">
        <h3 className="cart-item-title">{item.name}</h3>

        <div className="cart-item-price">
          <span className="price-symbol">MGA</span>
          <span className="price-whole">{Math.floor(item.price)}</span>
          <span className="price-fraction">{((item.price % 1) * 100).toFixed(0).padStart(2, '0')}</span>
        </div>

        <div className="cart-item-controls">
          <div className="quantity-selector">
            <label>Qté:</label>
            <select
              value={item.quantity}
              onChange={handleQuantityChange}
              className="quantity-select"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <button
            className="delete-btn"
            onClick={() => removeFromCart(item.id)}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}