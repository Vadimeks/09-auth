// app/hooks/useProfile.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/api";
import { User } from "@/types/user";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await api.get<User>("/auth/session", {
        withCredentials: true,
      });
      return response.data;
    },
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
}
