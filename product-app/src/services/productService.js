import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/products"
});

export const getProducts = () => API.get("/");
export const getProductById = (id) => API.get(`/${id}`);