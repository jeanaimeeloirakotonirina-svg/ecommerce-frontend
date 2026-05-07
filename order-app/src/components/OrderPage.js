import React, { useEffect, useState } from "react";
import OrderSummary from "./OrderSummary";
import PaymentStatus from "./PaymentStatus";
import useOrder from "../hooks/useOrder";
import "./OrderPage.css";

const PAYMENT_METHODS = [
  { value: "credit_card", label: "Carte de crédit", description: "Visa, MasterCard, American Express" },
  { value: "paypal", label: "PayPal", description: "Paiement sécurisé via PayPal" },
  { value: "mobile_money", label: "Mobile Money", description: "Orange Money / Mvola" },
];

export default function OrderPage() {
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const { placeOrder, status } = useOrder();

  // récupérer panier depuis localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(saved);
  }, []);

  const handleOrder = () => {
    placeOrder(cart, paymentMethod);
  };

  const selectedMethod = PAYMENT_METHODS.find((method) => method.value === paymentMethod);
  const isProcessing = status === "creating" || status === "paying";

  if (cart.length === 0) {
    return (
      <div className="order-empty">
        <h1>Aucun article à commander</h1>
        <p>Retournez à votre panier pour ajouter des articles.</p>
        <a href="/" className="varotra-btn-primary">Retour au panier</a>
      </div>
    );
  }

  return (
    <div className="order-container">
      <div className="order-header">
        <h1>Passer la commande</h1>
        <div className="checkout-steps">
          <span className="step active">1. Connexion</span>
          <span className="step active">2. Livraison</span>
          <span className="step active">3. Paiement</span>
          <span className="step">4. Confirmation</span>
        </div>
      </div>

      <div className="order-content">
        <div className="order-main">
          <div className="shipping-section">
            <h2>Adresse de livraison</h2>
            <div className="address-card">
              <p><strong>Jean Dupont</strong></p>
              <p>123 Rue de la Paix</p>
              <p>75001 Paris, France</p>
              <button className="varotra-btn-secondary">Modifier</button>
            </div>
          </div>

          <div className="payment-section">
            <h2>Méthode de paiement</h2>
            <div className="payment-card payment-methods">
              {PAYMENT_METHODS.map((method) => (
                <label key={method.value} className="payment-method-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.value}
                    checked={paymentMethod === method.value}
                    onChange={() => setPaymentMethod(method.value)}
                  />
                  <div>
                    <strong>{method.label}</strong>
                    <p>{method.description}</p>
                  </div>
                </label>
              ))}
            </div>
            <div className="payment-card payment-summary">
              <p>
                <strong>Méthode sélectionnée :</strong> {selectedMethod?.label}
              </p>
              <p>{selectedMethod?.description}</p>
            </div>
          </div>

          <div className="review-section">
            <h2>Réviser les articles et la livraison</h2>
            <OrderSummary cart={cart} />
          </div>
        </div>

        <div className="order-sidebar">
          <div className="order-summary-sticky">
            <button
              className="order-confirm-btn"
              onClick={handleOrder}
              disabled={isProcessing}
            >
              {isProcessing ? "Traitement..." : "Confirmer la commande"}
            </button>

            <PaymentStatus status={status} />

            <div className="order-terms">
              <p>
                En passant votre commande, vous acceptez les
                <a href="#" className="terms-link"> Conditions générales de vente </a>
                de Varotra.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
