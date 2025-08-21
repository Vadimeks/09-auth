// lib/api/clientApi.ts
import { goitApi } from "./api";
import { User, LoginRequest, RegisterRequest } from "@/types/user";
import { Note, FetchNotesResponse } from "@/types/note";

export const checkSession = async () => {
  try {
    const res = await goitApi.get("/auth/session");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getMe = async () => {
  try {
    const { data } = await goitApi.get<User>("/users/me");
    return data;
  } catch (error) {
    throw error;
  }
};

export const login = async (payload: LoginRequest): Promise<User> => {
  try {
    const { data } = await goitApi.post<User>("/auth/login", payload);
    return data;
  } catch (error) {
    throw error;
  }
};

export const register = async (payload: RegisterRequest): Promise<User> => {
  try {
    const { data } = await goitApi.post<User>("/auth/register", payload);
    return data;
  } catch (error) {
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await goitApi.post("/auth/logout");
  } catch (error) {
    throw error;
  }
};

export const fetchNotes = async (
  page: number,
  perPage: number,
  search: string = "",
  tag?: string
): Promise<FetchNotesResponse> => {
  try {
    const params: {
      page: number;
      perPage: number;
      search?: string;
      tag?: string;
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

    const response = await goitApi.get<FetchNotesResponse>(`/notes`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createNote = async (
  note: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> => {
  try {
    const response = await goitApi.post<Note>(`/notes`, note);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteNote = async (id: string): Promise<Note> => {
  try {
    const response = await goitApi.delete<Note>(`/notes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
