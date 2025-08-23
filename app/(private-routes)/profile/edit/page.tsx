/* app/(private-routes)/profile/edit/page.tsx */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";
import { api } from "@/lib/api/api";
import { User } from "@/types/user";
import css from "./EditProfilePage.module.css";

export default function EditProfilePage() {
  const { user, isAuthenticated, setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({ username: "", email: "" });
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
          email: response.data.email || "",
        });
      } catch {
        router.push("/sign-in");
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const payload: Partial<User> = {};
      if (formData.username.trim() && formData.username !== user?.username) {
        payload.username = formData.username.trim();
      }
      if (formData.email.trim() && formData.email !== user?.email) {
        payload.email = formData.email.trim();
      }
      if (Object.keys(payload).length === 0) {
        setError("No changes to save");
        return;
      }

      const response = await api.patch<User>("/users/me", payload);
      setUser(response.data);
      router.push("/profile");
    } catch (err) {
      const message =
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        (err as { response?: { data?: { message?: string } } }).response?.data
          ?.message
          ? (err as { response?: { data?: { message?: string } } }).response!
              .data!.message!
          : "Failed to update profile";
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
    return null;
  }

  const avatarSrc: string =
    user.avatar ?? "https://ac.goit.global/fullstack/react/default-avatar.jpg";

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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
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
        <div className={css.avatarBlock}>
          <Image
            src={avatarSrc}
            alt="Avatar"
            className={css.avatar}
            width={64}
            height={64}
            priority
          />
        </div>
      </div>
    </main>
  );
}
