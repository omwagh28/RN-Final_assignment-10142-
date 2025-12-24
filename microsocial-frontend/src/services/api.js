// microsocial-frontend/src/services/api.js

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// laptop IP address
const API_BASE_URL = "http://10.244.187.139:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically to every request
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
