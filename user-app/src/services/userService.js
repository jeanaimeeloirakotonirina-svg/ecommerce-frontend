import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/users"
});

// ajouter token automatiquement
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// récupérer profil
export const getProfile = () => API.get("/me");

// update profil
export const updateProfile = (data) => API.put("/me", data);

// historique commandes
export const getOrders = () => API.get("/me/orders");