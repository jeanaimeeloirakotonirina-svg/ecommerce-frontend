import useRecommendations from "../hooks/useRecommendations";
import RecommendationCard from "./RecommendationCard";

export default function RecommendationList() {
  const data = useRecommendations();

  if (!data.length) return <h3>Aucune recommandation</h3>;

  return (
    <div>
      <h2>🔥 Recommandé pour vous</h2>

      {data.map((p) => (
        <RecommendationCard key={p.id} product={p} />
      ))}
    </div>
  );
}