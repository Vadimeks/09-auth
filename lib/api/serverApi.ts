// lib/api/serverApi.ts
import { cookies } from "next/headers";
import { goitApi } from "./api";
import { User } from "@/types/user";

export const checkServerSession = async () => {
  const cookieStore = cookies();
  const res = await goitApi.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = cookies();
  const { data } = await goitApi.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
