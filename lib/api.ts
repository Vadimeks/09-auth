// lib/api.ts

import axios from "axios";
import type { Note } from "@/types/note";
import type { FetchNotesResponse } from "@/types/api";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const fetchNoteById = async (id: string): Promise<Note> => {
  try {
    const response = await axios.get<Note>(`${API_BASE_URL}/notes/${id}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    return response.data;
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

    const response = await axios.get<FetchNotesResponse>(
      `${API_BASE_URL}/notes`,
      {
        params,
        headers: { Authorization: `Bearer ${TOKEN}` },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        `Error fetching notes: ${error.response.status} - ${error.response.data}`
      );
    } else {
      console.error("Error fetching notes:", error);
    }
    throw error;
  }
};

export const createNote = async (
  note: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> => {
  try {
    const response = await axios.post<Note>(`${API_BASE_URL}/notes`, note, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteNote = async (id: string): Promise<Note> => {
  try {
    const response = await axios.delete<Note>(`${API_BASE_URL}/notes/${id}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
