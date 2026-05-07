import React from "react";
import "./OrderSummary.css";

export default function OrderSummary({ cart }) {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 25 ? 0 : 3.99;
  const total = subtotal + shipping;

  return (
    <div className="order-summary">
      {cart.map((item, index) => (
        <div key={index} className="order-item">
          <div className="item-image">
            <img
              src={item.image || "https://via.placeholder.com/80x80"}
              alt={item.name}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/80x80?text=Image";
              }}
            />
          </div>

          <div className="item-details">
            <h4 className="item-title">{item.name}</h4>
            <p className="item-price">
              <span className="price-symbol">MGA</span>
              <span className="price-whole">{Math.floor(item.price)}</span>
              <span className="price-fraction">{((item.price % 1) * 100).toFixed(0).padStart(2, '0')}</span>
            </p>
            <p className="item-quantity">Quantité: {item.quantity}</p>
          </div>
        </div>
      ))}

      <div className="order-totals">
        <div className="total-row">
          <span>Sous-total ({cart.length} article{cart.length > 1 ? 's' : ''})</span>
          <span className="price">
            <span className="price-symbol">MGA</span>
            <span className="price-whole">{Math.floor(subtotal)}</span>
            <span className="price-fraction">{((subtotal % 1) * 100).toFixed(0).padStart(2, '0')}</span>
          </span>
        </div>

        <div className="total-row">
          <span>Livraison</span>
          <span className="price">
            {shipping === 0 ? 'GRATUIT' : `MGA${shipping.toFixed(2)}`}
          </span>
        </div>

        <hr />

        <div className="total-row final-total">
          <span>Total</span>
          <span className="price">
            <span className="price-symbol">MGA</span>
            <span className="price-whole">{Math.floor(total)}</span>
            <span className="price-fraction">{((total % 1) * 100).toFixed(0).padStart(2, '0')}</span>
          </span>
        </div>
      </div>
    </div>
  );
}