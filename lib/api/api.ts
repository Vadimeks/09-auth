// lib/api/api.ts
import axios from "axios";

export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export const goitApi = axios.create({
  baseURL: "https://notehub-api.goit.study",
  withCredentials: true,
});
