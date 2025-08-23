// lib/api/clientApi.ts
import { api } from "./api";
import type { LoginRequest, RegisterRequest, User } from "@/types/user";
import type { Note, FetchNotesResponse, Tag } from "@/types/note";
import axios from "axios";

// login
export const loginUser = async (data: LoginRequest): Promise<User> => {
  console.log("Login request data:", data);
  try {
    const response = await api.post<User>("/auth/login", data);
    console.log("Login response:", JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        "Login error response:",
        JSON.stringify(error.response.data, null, 2)
      );
      throw new Error(error.response.data.message || "Login failed");
    }
    console.error("Unexpected login error:", error);
    throw new Error("Unexpected login error");
  }
};

// register
export const registerUser = async (data: RegisterRequest): Promise<User> => {
  console.log("Register request data:", data);
  try {
    const response = await api.post<User>("/auth/register", data);
    console.log("Register response:", JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        "Register error response:",
        JSON.stringify(error.response.data, null, 2)
      );
      throw new Error(error.response.data.message || "Registration failed");
    }
    console.error("Unexpected register error:", error);
    throw new Error("Unexpected register error");
  }
};

// logout
export const logoutUser = async (): Promise<void> => {
  try {
    await api.post("/auth/logout");
    console.log("Logout successful");
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        "Logout error response:",
        JSON.stringify(error.response.data, null, 2)
      );
      throw new Error(error.response.data.message || "Logout failed");
    }
    console.error("Unexpected logout error:", error);
    throw new Error("Unexpected logout error");
  }
};

// fetch notes
export const fetchNotes = async (
  page: number,
  perPage: number,
  search: string = "",
  tag?: Tag
): Promise<FetchNotesResponse> => {
  const params: {
    page: number;
    perPage: number;
    search?: string;
    tag?: Tag;
  } = {
    page,
    perPage,
  };

  if (search) {
    params.search = search;
  }
  if (tag && tag !== "All") {
    params.tag = tag;
  }

  console.log("Fetch notes request params:", params);
  try {
    const response = await api.get<FetchNotesResponse>("/notes", { params });
    console.log(
      "Fetch notes response:",
      JSON.stringify(response.data, null, 2)
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        "Fetch notes error response:",
        JSON.stringify(error.response.data, null, 2)
      );
      throw new Error(error.response.data.message || "Failed to fetch notes");
    }
    console.error("Unexpected fetch notes error:", error);
    throw new Error("Unexpected fetch notes error");
  }
};

// fetch note by id
export const fetchNoteById = async (id: string): Promise<Note> => {
  console.log("Fetch note by id:", id);
  try {
    const response = await api.get<Note>(`/notes/${id}`);
    console.log("Fetch note response:", JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        "Fetch note error response:",
        JSON.stringify(error.response.data, null, 2)
      );
      throw new Error(error.response.data.message || "Failed to fetch note");
    }
    console.error("Unexpected fetch note error:", error);
    throw new Error("Unexpected fetch note error");
  }
};

// create note
export const createNote = async (
  note: Omit<Note, "id" | "createdAt" | "updatedAt" | "userId">
): Promise<Note> => {
  console.log("Create note request:", note);
  try {
    const response = await api.post<Note>("/notes", note);
    console.log(
      "Create note response:",
      JSON.stringify(response.data, null, 2)
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        "Create note error response:",
        JSON.stringify(error.response.data, null, 2)
      );
      throw new Error(error.response.data.message || "Failed to create note");
    }
    console.error("Unexpected create note error:", error);
    throw new Error("Unexpected create note error");
  }
};

// delete note
export const deleteNote = async (id: string): Promise<Note> => {
  console.log("Delete note request id:", id);
  try {
    const response = await api.delete<Note>(`/notes/${id}`);
    console.log(
      "Delete note response:",
      JSON.stringify(response.data, null, 2)
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        "Delete note error response:",
        JSON.stringify(error.response.data, null, 2)
      );
      throw new Error(error.response.data.message || "Failed to delete note");
    }
    console.error("Unexpected delete note error:", error);
    throw new Error("Unexpected delete note error");
  }
};
