// lib/store/authStore.ts
import { create } from 'zustand';
import { User } from '@/types/user';

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: User) => {
    set(() => ({ user, isAuthenticated: true }));
  },
  clearUser: () => {
    set(() => ({ user: null, isAuthenticated: false }));
  },
}));
