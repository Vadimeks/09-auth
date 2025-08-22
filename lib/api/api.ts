// lib/api/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://notehub-api.goit.study",
  withCredentials: true,
});
