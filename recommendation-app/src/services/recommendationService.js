import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/recommendations"
});

export const getRecommendations = (userId) => {
  return API.get(`?userId=${userId}`);
};