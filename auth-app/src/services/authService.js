import axios from "axios";
import { publishUserEvent } from "./kafka";

const API = axios.create({
  baseURL: "http://localhost:3000/auth"
});

// Mock user for testing
const MOCK_USERS = {
  "admin@gmail.com": {
    email: "admin@gmail.com",
    password: "123456",
    name: "Admin User",
    role: "admin"
  }
};

// Generate mock JWT token
const generateMockToken = (user) => {
  const payload = {
    email: user.email,
    name: user.name,
    role: user.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 86400 // 24 hours
  };
  // Simple token encoding (not real JWT, but works for testing)
  return btoa(JSON.stringify(payload));
};

const saveUserToStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
  window.dispatchEvent(new Event("user-storage-updated"));
};

// LOGIN
export const login = async (email, password) => {
  try {
    // Check if it's a mock user
    const mockUser = MOCK_USERS[email];
    if (mockUser && mockUser.password === password) {
      const token = generateMockToken(mockUser);
      const user = {
        email: mockUser.email,
        name: mockUser.name,
        role: mockUser.role,
        avatar: null,
      };
      localStorage.setItem("token", token);
      saveUserToStorage(user);
      publishUserEvent("login", {
        email: mockUser.email,
        role: mockUser.role,
        source: "auth-app"
      }).catch(() => {
        // Ne pas bloquer la connexion si l'événement Kafka échoue
      });
      return { token, user };
    }
    
    // Try real API if not mock user
    const res = await API.post("/login", { email, password });
    const user = res.data.user || { email };
    localStorage.setItem("token", res.data.token);
    saveUserToStorage(user);
    publishUserEvent("login", {
      email,
      source: "auth-app"
    }).catch(() => {
      // Ne pas bloquer la connexion si l'événement Kafka échoue
    });
    return res.data;
  } catch (error) {
    if (MOCK_USERS[email] && MOCK_USERS[email].password !== password) {
      throw new Error("Email ou mot de passe incorrect");
    }
    throw error;
  }
};

// LOGOUT
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.dispatchEvent(new Event("user-storage-updated"));
};

// GET TOKEN
export const getToken = () => {
  return localStorage.getItem("token");
};

export const register = async (data) => {
  const res = await API.post("/register", data);
  const savedUser = {
    email: data.email,
    name: `${data.firstname} ${data.name}`,
    role: "user",
    avatar: data.avatar || null,
  };
  saveUserToStorage(savedUser);
  return res.data;
};

// FORGOT PASSWORD
export const forgotPassword = async (email) => {
  const res = await API.post("/forgot-password", { email });
  return res.data;
};