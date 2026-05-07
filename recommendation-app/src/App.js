import React from "react";
import RecommendationList from "./components/RecommendationList";
import VarotraHeader from "./VarotraHeader";
import VarotraFooter from "./VarotraFooter";
import "./varotra-theme.css";

export default function App() {
  return (
    <div className="varotra-theme">
      <VarotraHeader />
      <main className="varotra-main-content">
        <RecommendationList />
      </main>
      <VarotraFooter />
    </div>
  );
}