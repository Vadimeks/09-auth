// lib/api/serverApi.ts
import { api } from './api';
import { cookies } from 'next/headers';
import type { FetchNotesResponse, Note, Tag } from '@/types/note';
import type { User } from '@/types/user';
import axios, { AxiosResponse } from 'axios';

const getCookieString = async () => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  console.log('SSR cookies:', allCookies);
  return Array.from(allCookies)
    .map(({ name, value }) => `${name}=${value}`)
    .join('; ');
};

// NOTES API
export const fetchNotes = async (
  page: number,
  perPage: number,
  search: string = '',
  tag?: Tag
): Promise<FetchNotesResponse | null> => {
  const cookie = await getCookieString();
  try {
    const params: {
      page: number;
      perPage: number;
      search?: string;
      tag?: Tag;
    } = { page, perPage };
    if (search) params.search = search;
    if (tag && tag !== 'All') params.tag = tag;
    const response = await api.get<FetchNotesResponse>('/notes', {
      params,
      headers: { Cookie: cookie },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401)
      return null;
    if (process.env.NODE_ENV === 'development') {
      console.error('Server Error fetching notes:', error);
    }
    throw error;
  }
};

export const fetchNoteById = async (id: string): Promise<Note | null> => {
  const cookie = await getCookieString();
  try {
    const response = await api.get<Note>(`/notes/${id}`, {
      headers: { Cookie: cookie },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401)
      return null;
    if (process.env.NODE_ENV === 'development') {
      console.error('Server Error fetching note by id:', error);
    }
    throw error;
  }
};

export const createNote = async (
  note: Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'userId'>
): Promise<Note | null> => {
  const cookie = await getCookieString();
  try {
    const response = await api.post<Note>('/notes', note, {
      headers: { Cookie: cookie },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401)
      return null;
    if (process.env.NODE_ENV === 'development') {
      console.error('Server Error creating note:', error);
    }
    throw error;
  }
};

export const deleteNote = async (id: string): Promise<Note | null> => {
  const cookie = await getCookieString();
  try {
    const response = await api.delete<Note>(`/notes/${id}`, {
      headers: { Cookie: cookie },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401)
      return null;
    if (process.env.NODE_ENV === 'development') {
      console.error('Server Error deleting note:', error);
    }
    throw error;
  }
};

// AUTH & USER API

export const checkSession = async (): Promise<AxiosResponse<User> | null> => {
  const cookie = await getCookieString();
  try {
    const response = await api.get<User>('/auth/session', {
      headers: { Cookie: cookie },
    });
    return response;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Server Error checking session:', error);
    }
    return null;
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  const cookie = await getCookieString();
  try {
    // Абсалютны URL для SSR
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXT_SITE_URL ||
      'http://localhost:3000';
    const url = `${siteUrl}/api/users/me`;
    console.log('getCurrentUser url:', url);

    const response = await axios.get<User>(url, {
      headers: { Cookie: cookie },
      validateStatus: () => true,
    });
    console.log('getCurrentUser status:', response.status);
    console.log('getCurrentUser data:', response.data);
    if (response.status !== 200) return null;
    return response.data || null;
  } catch (error) {
    console.error('getCurrentUser error:', error);
    return null;
  }
};

export const updateUserProfile = async (data: {
  username?: string;
  avatarUrl?: string;
  email?: string;
}): Promise<User | null> => {
  const cookie = await getCookieString();
  try {
    const response = await api.patch<User>('/users/me', data, {
      headers: { Cookie: cookie },
    });
    return response.data;
  } catch {
    return null;
  }
};

export const logoutUser = async (): Promise<void> => {
  const cookie = await getCookieString();
  try {
    await api.post(
      '/auth/logout',
      {},
      {
        headers: { Cookie: cookie },
      }
    );
  } catch {
    // ignore
  }
};
