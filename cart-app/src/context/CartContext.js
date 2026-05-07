import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Sauvegarde automatique
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent("cart-storage-updated"));
  }, [cart]);

  // Ajouter produit
  const addToCart = (product) => {
    setCart(prev => {
      const exist = prev.find(p => p.id === product.id);
      if (exist) {
        return prev.map(p =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Supprimer
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  // Modifier quantité
  const updateQuantity = (id, qty) => {
    setCart(prev =>
      prev.map(p =>
        p.id === id ? { ...p, quantity: qty } : p
      )
    );
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
}