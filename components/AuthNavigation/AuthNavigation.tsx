// components/AuthNavigation/AuthNavigation
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { logoutUser } from "@/lib/api/clientApi";
import toast from "react-hot-toast";
import css from "./AuthNavigation.module.css";

const AuthNavigation = () => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, isAuthenticated, clearUser } = useAuthStore();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutUser();
      clearUser(); // Ачышчаем стан
      toast.success("Logged out!");
      router.push("/sign-in");
    } catch (error: unknown) {
      let message = "Logout failed";
      if (typeof error === "object" && error !== null && "message" in error) {
        message = String((error as { message?: string }).message);
      }
      toast.error(message);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <li className={css.navigationItem}>
        <Link href="/profile" prefetch={false} className={css.navigationLink}>
          Profile
        </Link>
      </li>

      {isAuthenticated && user && (
        <li className={css.navigationItem}>
          <p className={css.userEmail}>{user.email}</p>
          <button
            className={css.logoutButton}
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </li>
      )}

      {!isAuthenticated && (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/sign-in"
              prefetch={false}
              className={css.navigationLink}
            >
              Login
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link
              href="/sign-up"
              prefetch={false}
              className={css.navigationLink}
            >
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  );
};

export default AuthNavigation;
