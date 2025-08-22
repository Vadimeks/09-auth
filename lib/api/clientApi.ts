import { api } from "./api";
import type { LoginRequest, RegisterRequest, User } from "@/types/user";
import type { Note, FetchNotesResponse, Tag } from "@/types/note";

// login
export const loginUser = async (data: LoginRequest): Promise<User> => {
  const response = await api.post<User>("/auth/login", data);
  return response.data;
};

// register
export const registerUser = async (data: RegisterRequest): Promise<User> => {
  const response = await api.post<User>("/auth/register", data);
  return response.data;
};

// fetch notes (спіс нотатак)
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

  const response = await api.get<FetchNotesResponse>("/notes", { params });
  return response.data;
};

// fetch note by id
export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

// create note
export const createNote = async (
  note: Omit<Note, "id" | "createdAt" | "updatedAt" | "userId">
): Promise<Note> => {
  const response = await api.post<Note>("/notes", note);
  return response.data;
};

// delete note
export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};
