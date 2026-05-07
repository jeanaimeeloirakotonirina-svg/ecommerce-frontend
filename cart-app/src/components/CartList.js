import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import "./CartList.css";

export default function CartList() {
  const { cart } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-content">
          <h1>Votre panier Varotra Azo Antoka est vide</h1>
          <p>Après avoir ajouté des articles à votre panier, ils apparaîtront ici.</p>
          <a href="/" className="varotra-btn-primary">Continuer vos achats</a>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Panier ({cart.length} article{cart.length > 1 ? 's' : ''})</h1>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cart.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="cart-sidebar">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}