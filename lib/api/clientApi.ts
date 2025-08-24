// lib/api/clientApi.ts
import { api } from './api';
import type {
  UserLoginFormValues,
  UserRegisterFormValues,
  User,
} from '@/types/user';
import type { Note, FetchNotesResponse, Tag } from '@/types/note';
import axios from 'axios';

// login
export const loginUser = async (data: UserLoginFormValues): Promise<User> => {
  try {
    const response = await api.post<User>('/auth/login', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Login failed');
    }
    throw new Error('Unexpected login error');
  }
};

// register
export const registerUser = async (
  data: UserRegisterFormValues
): Promise<User> => {
  try {
    const response = await api.post<User>('/auth/register', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Registration failed');
    }
    throw new Error('Unexpected register error');
  }
};

// logout
export const logoutUser = async (): Promise<void> => {
  try {
    await api.post('/auth/logout', {});
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Logout failed');
    }
    throw new Error('Unexpected logout error');
  }
};

// fetch notes
export const fetchNotes = async (
  page: number,
  perPage: number,
  search: string = '',
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
  if (tag && tag !== 'All') {
    params.tag = tag;
  }

  try {
    const response = await api.get<FetchNotesResponse>('/notes', { params });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch notes');
    }
    throw new Error('Unexpected fetch notes error');
  }
};

// fetch note by id
export const fetchNoteById = async (id: string): Promise<Note> => {
  try {
    const response = await api.get<Note>(`/notes/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch note');
    }
    throw new Error('Unexpected fetch note error');
  }
};

// create note
export const createNote = async (
  note: Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'userId'>
): Promise<Note> => {
  try {
    const response = await api.post<Note>('/notes', note);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to create note');
    }
    throw new Error('Unexpected create note error');
  }
};

// delete note
export const deleteNote = async (id: string): Promise<Note> => {
  try {
    const response = await api.delete<Note>(`/notes/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to delete note');
    }
    throw new Error('Unexpected delete note error');
  }
};

// update user profile
export const updateUserProfile = async (data: {
  username?: string;
  avatar?: string;
  email?: string;
}): Promise<User> => {
  try {
    const response = await api.patch<User>('/users/me', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || 'Failed to update user profile'
      );
    }
    throw new Error('Unexpected update profile error');
  }
};

// fetch session
export const fetchSession = async (): Promise<User | null> => {
  try {
    const response = await api.get('/auth/session');
    if (response.data && response.data.email) {
      return response.data as User;
    }
    return null;
  } catch {
    return null;
  }
};
