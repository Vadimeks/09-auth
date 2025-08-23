// app/(private-routes)/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { api } from "@/lib/api/api";
import { User } from "@/types/user";
import css from "./ProfilePage.module.css";

export default function ProfilePage() {
  const { user, isAuthenticated, setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      if (!isAuthenticated || !user) {
        try {
          const response = await api.get<User>("/auth/session");
          if (response.data) {
            setUser(response.data);
          } else {
            router.push("/sign-in");
          }
        } catch (error) {
          console.error("Session check error:", error);
          router.push("/sign-in");
        }
      }
      setIsLoading(false);
    };

    checkSession();
  }, [isAuthenticated, user, setUser, router]);

  if (isLoading) {
    return (
      <main className={css.mainContent}>
        <p>Loading...</p>
      </main>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={
              user.avatar ||
              "https://ac.goit.global/fullstack/react/default-avatar.jpg"
            }
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username || "No username"}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
