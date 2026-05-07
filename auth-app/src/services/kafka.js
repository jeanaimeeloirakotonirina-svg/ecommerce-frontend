import axios from "axios";

// Kafka event publisher for frontend apps.
// The browser cannot connect directly to Kafka brokers, so this helper forwards events
// to a backend Kafka gateway endpoint.
//
// Le frontend a son propre rôle : il est producteur d'événements, et le backend
// est responsable de la connexion réelle à Kafka.

const FRONTEND_ROLE = "frontend";
const KAFKA_GATEWAY_PATH = "/kafka/events";

const API = axios.create({
  baseURL: "http://localhost:3000"
});

// 🔐 Ajout automatique du token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Gestion erreurs globale
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export const publishKafkaEvent = async (topic, payload) => {
  const response = await API.post(KAFKA_GATEWAY_PATH, {
    topic,
    payload: {
      ...payload,
      senderRole: FRONTEND_ROLE,
    },
  });
  return response.data;
};

export const publishUserEvent = async (eventType, data) => {
  return publishKafkaEvent("user-events", {
    type: eventType,
    data,
  });
};

export const publishOrderEvent = async (eventType, data) => {
  return publishKafkaEvent("order-events", {
    type: eventType,
    data,
  });
};

export const publishAnalyticsEvent = async (eventType, data) => {
  return publishKafkaEvent("analytics-events", {
    type: eventType,
    data,
  });
};