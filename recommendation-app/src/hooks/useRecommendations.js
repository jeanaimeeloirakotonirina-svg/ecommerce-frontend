import { useEffect, useState } from "react";
import { getRecommendations } from "../services/recommendationService";

export default function useRecommendations() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId") || 1;

    getRecommendations(userId)
      .then(res => setData(res.data))
      .catch(() => setData([]));
  }, []);

  return data;
}