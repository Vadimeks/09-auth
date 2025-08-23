// components / AuthProvider / AuthProvider
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { fetchSession } from "@/lib/api/clientApi";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const { isAuthenticated, setUser, clearUser } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Праверка сесіі праз API (fetchSession)
    const checkSession = async () => {
      try {
        const user = await fetchSession();
        if (user) {
          setUser(user);
        } else {
          clearUser();
          router.replace("/sign-in");
        }
      } catch {
        clearUser();
        router.replace("/sign-in");
      } finally {
        setLoading(false);
      }
    };
    checkSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Loader падчас праверкі
  if (loading) {
    return <div>Loading...</div>;
  }

  // Калі не аўтарызаваны — нічога не рэндэр
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
