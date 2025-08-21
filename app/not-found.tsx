/* app/not-found.tsx */
import type { Metadata } from "next";
import Link from "next/link";
import css from "./not-found.module.css";

export const metadata: Metadata = {
  title: "NoteHub - 404 Page Not Found",
  description: "The page you are looking for does not exist on NoteHub.",
  openGraph: {
    title: "NoteHub - 404 Page Not Found",
    description: "The page you are looking for does not exist on NoteHub.",
    url: "https://08-zustand-swart-three.vercel.app/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Preview",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page Not Found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/" className={css.homeLink}>
        Return Home
      </Link>
    </div>
  );
}
