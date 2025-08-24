// lib/store/authStore.ts
import { create } from 'zustand';
import { User } from '@/types/user';

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  user: null,
  loading: true,
  setUser: (user: User) => {
    set(() => ({ user, isAuthenticated: true, loading: false }));
  },
  clearUser: () => {
    set(() => ({ user: null, isAuthenticated: false, loading: false }));
  },
}));
