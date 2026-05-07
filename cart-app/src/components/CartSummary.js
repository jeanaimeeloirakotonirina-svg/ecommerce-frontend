import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./CartSummary.css";

export default function CartSummary() {
  const { cart } = useContext(CartContext);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 25 ? 0 : 3.99;
  const total = subtotal + shipping;

  const checkout = () => {
    console.log("Commande envoyée", cart);
    alert("Commande passée avec succès !");
  };

  return (
    <div className="cart-summary">
      <div className="summary-content">
        <div className="summary-row">
          <span>Sous-total ({cart.length} article{cart.length > 1 ? 's' : ''})</span>
          <span className="price">
            <span className="price-symbol">MGA</span>
            <span className="price-whole">{Math.floor(subtotal)}</span>
            <span className="price-fraction">{((subtotal % 1) * 100).toFixed(0).padStart(2, '0')}</span>
          </span>
        </div>

        <div className="summary-row">
          <span>Livraison</span>
          <span className="price">
            {shipping === 0 ? 'GRATUIT' : `MGA${shipping.toFixed(2)}`}
          </span>
        </div>

        <hr />

        <div className="summary-row total-row">
          <span>Total</span>
          <span className="price total-price">
            <span className="price-symbol">MGA</span>
            <span className="price-whole">{Math.floor(total)}</span>
            <span className="price-fraction">{((total % 1) * 100).toFixed(0).padStart(2, '0')}</span>
          </span>
        </div>

        <button className="checkout-btn" onClick={checkout}>
          Passer la commande
        </button>

        <div className="summary-footer">
          <p>✅ Livraison gratuite dès 25 MGA d'achat</p>
          <p>🔒 Paiement 100% sécurisé</p>
        </div>
      </div>
    </div>
  );
}