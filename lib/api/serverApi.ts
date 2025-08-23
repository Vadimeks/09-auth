// lib/api/serverApi.ts
import { api } from "./api";
import { headers } from "next/headers";
import type { FetchNotesResponse, Note, Tag } from "@/types/note";
import axios from "axios";

export const fetchNotes = async (
  page: number,
  perPage: number,
  search: string = "",
  tag?: Tag
): Promise<FetchNotesResponse | null> => {
  const headersInstance = await headers();
  const cookie = headersInstance.get("cookie") || "";
  try {
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

    const response = await api.get<FetchNotesResponse>("/notes", {
      params,
      headers: { Cookie: cookie },
    });
    return response.data;
  } catch (error) {
    // Не выводзім у кансолі памылку, калі гэта 401 (неаўтэнтыфікаваны юзер)
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // Можна вяртаць null або пусты вынік
      return null;
    }
    // Выводзім у кансолі толькі сапраўдныя памылкі
    if (process.env.NODE_ENV === "development") {
      console.error("Server Error fetching notes:", error);
    }
    throw error;
  }
};

export const fetchNoteById = async (id: string): Promise<Note | null> => {
  const headersInstance = await headers();
  const cookie = headersInstance.get("cookie") || "";
  try {
    const response = await api.get<Note>(`/notes/${id}`, {
      headers: { Cookie: cookie },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }
    if (process.env.NODE_ENV === "development") {
      console.error("Server Error fetching note by id:", error);
    }
    throw error;
  }
};

export const createNote = async (
  note: Omit<Note, "id" | "createdAt" | "updatedAt" | "userId">
): Promise<Note | null> => {
  const headersInstance = await headers();
  const cookie = headersInstance.get("cookie") || "";
  try {
    const response = await api.post<Note>("/notes", note, {
      headers: { Cookie: cookie },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }
    if (process.env.NODE_ENV === "development") {
      console.error("Server Error creating note:", error);
    }
    throw error;
  }
};

export const deleteNote = async (id: string): Promise<Note | null> => {
  const headersInstance = await headers();
  const cookie = headersInstance.get("cookie") || "";
  try {
    const response = await api.delete<Note>(`/notes/${id}`, {
      headers: { Cookie: cookie },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }
    if (process.env.NODE_ENV === "development") {
      console.error("Server Error deleting note:", error);
    }
    throw error;
  }
};
