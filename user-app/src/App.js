import React from "react";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import OrderHistory from "./components/OrderHistory";
import VarotraHeader from "./VarotraHeader";
import VarotraFooter from "./VarotraFooter";
import "./varotra-theme.css";
import { MemoryRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="varotra-theme">
      <VarotraHeader />
      <main className="varotra-main-content">
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="/edit" element={<EditProfile />} />
            <Route path="/orders" element={<OrderHistory />} />
          </Routes>
        </MemoryRouter>
      </main>
      <VarotraFooter />
    </div>
  );
}