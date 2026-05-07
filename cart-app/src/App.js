import React, { useContext, useEffect } from "react";
import { CartProvider, CartContext } from "./context/CartContext";
import CartList from "./components/CartList";
import VarotraHeader from "./VarotraHeader";
import VarotraFooter from "./VarotraFooter";
import "./varotra-theme.css";

function CartContainer() {
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const handler = (e) => addToCart(e.detail);

    window.addEventListener("ADD_TO_CART", handler);

    return () => window.removeEventListener("ADD_TO_CART", handler);
  }, []);

  return (
    <div className="varotra-theme">
      <VarotraHeader />
      <main className="varotra-main-content">
        <CartList />
      </main>
      <VarotraFooter />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <CartContainer />
    </CartProvider>
  );
}