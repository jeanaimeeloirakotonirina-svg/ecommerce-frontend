import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000"
});

// créer commande
export const createOrder = (data) => {
  return API.post("/orders", data);
};

// payer commande
export const payOrder = (orderId, paymentMethod) => {
  return API.post(`/payments/${orderId}`, { paymentMethod });
};