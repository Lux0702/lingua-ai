import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window === "undefined") return config;

  const token = window.localStorage.getItem("polyglot-access-token");
  if (token) {
    const tokenType = window.localStorage.getItem("polyglot-token-type") ?? "Bearer";
    config.headers.Authorization = `${tokenType} ${token}`;
  }

  return config;
});
