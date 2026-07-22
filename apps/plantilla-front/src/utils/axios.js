// src/services/api.js

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8005/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * Interceptor de solicitudes
 * Agrega el token JWT automáticamente
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Interceptor de respuestas
 */
api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (!error.response) {
      console.error("Error de conexión con el servidor.");
      return Promise.reject(error);
    }

    switch (error.response.status) {
      case 400:
        console.error("Solicitud incorrecta.");
        break;

      case 401:
        console.error("Sesión expirada.");

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";
        break;

      case 403:
        console.error("No tienes permisos.");
        break;

      case 404:
        console.error("Recurso no encontrado.");
        break;

      case 422:
        console.error("Error de validación.");
        break;

      case 500:
        console.error("Error interno del servidor.");
        break;

      default:
        console.error("Ha ocurrido un error.");
    }

    return Promise.reject(error);
  }
);

export default api;