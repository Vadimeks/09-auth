// components / AuthProvider / AuthProvider
'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { fetchSession } from '@/lib/api/clientApi';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { setUser, clearUser } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await fetchSession();
        if (user) {
          setUser(user);
        } else {
          clearUser();
        }
      } catch {
        clearUser();
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, [setUser, clearUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
