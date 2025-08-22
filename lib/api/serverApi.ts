// lib/api/serverApi.ts
import { api } from "./api"; // Змянілі імпарт на названы экспарт
import { headers } from "next/headers";
import type { FetchNotesResponse, Note, Tag } from "@/types/note";

export const fetchNotes = async (
  page: number,
  perPage: number,
  search: string = "",
  tag?: Tag
): Promise<FetchNotesResponse> => {
  const headersInstance = await headers(); // Дадаем await для headers
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
    console.error("Server Error fetching notes:", error);
    throw error;
  }
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const headersInstance = await headers(); // Дадаем await
  const cookie = headersInstance.get("cookie") || "";
  try {
    const response = await api.get<Note>(`/notes/${id}`, {
      headers: { Cookie: cookie },
    });
    return response.data;
  } catch (error) {
    console.error("Server Error fetching note by id:", error);
    throw error;
  }
};

export const createNote = async (
  note: Omit<Note, "id" | "createdAt" | "updatedAt" | "userId">
): Promise<Note> => {
  const headersInstance = await headers(); // Дадаем await
  const cookie = headersInstance.get("cookie") || "";
  try {
    const response = await api.post<Note>("/notes", note, {
      headers: { Cookie: cookie },
    });
    return response.data;
  } catch (error) {
    console.error("Server Error creating note:", error);
    throw error;
  }
};

export const deleteNote = async (id: string): Promise<Note> => {
  const headersInstance = await headers(); // Дадаем await
  const cookie = headersInstance.get("cookie") || "";
  try {
    const response = await api.delete<Note>(`/notes/${id}`, {
      headers: { Cookie: cookie },
    });
    return response.data;
  } catch (error) {
    console.error("Server Error deleting note:", error);
    throw error;
  }
};
