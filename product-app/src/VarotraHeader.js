import React, { useEffect, useState } from "react";
import "./varotra-theme.css";

export default function VarotraHeader() {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    const updateCartCount = () => {
      const storedCart = localStorage.getItem("cart");
      const cart = storedCart ? JSON.parse(storedCart) : [];
      const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
      setCartCount(count);
    };

    updateUser();
    updateCartCount();

    window.addEventListener("user-storage-updated", updateUser);
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cart-storage-updated", updateCartCount);
    return () => {
      window.removeEventListener("user-storage-updated", updateUser);
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cart-storage-updated", updateCartCount);
    };
  }, []);

  const renderUserProfile = () => {
    if (!user) {
      return <a href="/login" className="varotra-nav-link">Bonjour, Identifiez-vous</a>;
    }

    const initials = user.name
      ? user.name
          .split(" ")
          .map((part) => part[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : user.email
      ? user.email.charAt(0).toUpperCase()
      : "?";

    return (
      <a href="/profile" className="varotra-user-profile">
        {user.avatar ? (
          <img src={user.avatar} alt={user.name || user.email} className="varotra-user-avatar" />
        ) : (
          <span className="varotra-avatar-fallback">{initials}</span>
        )}
        <span>Bonjour, {user.name?.split(" ")[0] || user.email}</span>
      </a>
    );
  };

  return (
    <header className="varotra-header">
      <a href="/" className="varotra-logo">
        Varotra Azo Antoka
      </a>

      <div className="varotra-search-bar">
        <input
          type="text"
          placeholder="Rechercher Varotra Azo Antoka"
          className="varotra-search-input"
        />
        <button className="varotra-search-button">
          🔍
        </button>
      </div>

      <nav className="varotra-nav-links">
        {renderUserProfile()}
        <a href="#" className="varotra-nav-link">Retour et commandes</a>
        <a href="/cart" className="varotra-nav-link varotra-cart-link">
          <span className="varotra-cart-icon" aria-hidden="true">🛒</span>
          Panier
          {cartCount > 0 && <span className="varotra-cart-badge">{cartCount}</span>}
        </a>
      </nav>
    </header>
  );
}
