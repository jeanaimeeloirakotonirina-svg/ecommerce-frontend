import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Loader from "./components/Loader";
import "./varotra-theme.css";

// Micro-frontends
const ProductApp = React.lazy(() => import("product/App"));
const CartApp = React.lazy(() => import("cart/App"));
const OrderApp = React.lazy(() => import("order/App"));
const AuthApp = React.lazy(() => import("auth/App"));
const RecommendationApp = React.lazy(() => import("recommendation/App"));

export default function App() {
  return (
    <div className="varotra-theme">
      <BrowserRouter>
        <Navbar />

        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<ProductApp />} />

            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <CartApp />
                </PrivateRoute>
              }
            />

            <Route
              path="/orders"
              element={
                <PrivateRoute>
                  <OrderApp />
                </PrivateRoute>
              }
            />

            <Route path="/login" element={<AuthApp />} />

            <Route
              path="/recommendations"
              element={<RecommendationApp />}
            />
          </Routes>
        </Suspense>
      </BrowserRouter>

      <footer className="varotra-footer">
        <div className="varotra-footer-content">
          <p>Varotra Azo Antoka</p>
        </div>
      </footer>
    </div>
  );
}