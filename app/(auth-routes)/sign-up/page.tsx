// app/(auth-routes)/sign-up/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import toast from "react-hot-toast";
import axios from "axios";
import css from "./SignUpPage.module.css";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { setUser } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const user = await registerUser({ email, password });
      setUser(user); // Дадаем карыстальніка ў стор
      toast.success("Registration successful!");
      router.push("/profile"); // Рэдірэкт на /profile паводле задання
    } catch (error: unknown) {
      let message = "Registration failed";
      if (axios.isAxiosError(error) && error.response) {
        console.error(
          "Register error:",
          JSON.stringify(error.response.data, null, 2)
        );
        message = error.response.data.message || "Unknown registration error";
      } else if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={css.input}
            required
            autoComplete="username"
          />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={css.input}
            required
            autoComplete="new-password"
          />
        </div>
        <div className={css.actions}>
          <button
            type="submit"
            className={css.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing up..." : "Register"}
          </button>
        </div>
        <p className={css.error}>{isSubmitting ? "" : " "}</p>
      </form>
    </main>
  );
}
