/* app/(private-routes)/profile/edit/page.tsx */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { api } from "@/lib/api/api";
import { User } from "@/types/user";
import css from "./EditProfilePage.module.css";

export default function EditProfilePage() {
  const { user, isAuthenticated, setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({ username: "", avatar: "" });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      if (!isAuthenticated || !user) {
        router.push("/sign-in");
        return;
      }
      try {
        const response = await api.get<User>("/auth/session");
        setUser(response.data);
        setFormData({
          username: response.data.username || "",
          avatar: response.data.avatar || "",
        });
      } catch (err: unknown) {
        console.error("Session check error:", err);
        router.push("/sign-in");
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [isAuthenticated, user, setUser, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await api.patch<User>("/users", formData);
      setUser(response.data);
      router.push("/profile");
    } catch (err: unknown) {
      let message = "Failed to update profile";
      if (typeof err === "object" && err !== null && "response" in err) {
        message =
          (err as { response?: { data?: { message?: string } } }).response?.data
            ?.message || message;
      }
      setError(message);
    }
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isLoading) {
    return (
      <main className={css.mainContent}>
        <p>Loading...</p>
      </main>
    );
  }

  if (!isAuthenticated || !user) {
    return null; // Перанакіраванне адбудзецца ў useEffect
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        {error && <p className={css.error}>{error}</p>}
        <form onSubmit={handleSubmit} className={css.form}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={css.input}
            />
          </div>
          <div className={css.usernameWrapper}>
            <label htmlFor="avatar">Avatar URL</label>
            <input
              type="text"
              id="avatar"
              name="avatar"
              value={formData.avatar}
              onChange={handleInputChange}
              className={css.input}
            />
          </div>
          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save Changes
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
