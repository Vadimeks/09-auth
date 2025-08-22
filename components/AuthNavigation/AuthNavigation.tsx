// components/AuthNavigation/AuthNavigation
"use client";

import Link from "next/link";
import css from "./AuthNavigation.module.css";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/api/clientApi";
import toast from "react-hot-toast";
import { useState } from "react";

// Можна захоўваць email праз props або context (пакуль што для прыкладу тут захардкодзім)
const userEmail =
  typeof window !== "undefined" ? localStorage.getItem("userEmail") : null;

const AuthNavigation = () => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutUser();
      localStorage.removeItem("userEmail");
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

      {userEmail && (
        <li className={css.navigationItem}>
          <p className={css.userEmail}>{userEmail}</p>
          <button
            className={css.logoutButton}
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            Logout
          </button>
        </li>
      )}

      {!userEmail && (
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
