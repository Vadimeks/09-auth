// app/notes/action/create/page.tsx
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "NoteHub - Create Note",
  description: "Start a new note and save it as a draft.",
  openGraph: {
    title: "NoteHub - Create Note",
    description: "Start a new note and save it as a draft.",
    url: "https://08-zustand-swart-three.vercel.app/notes/action/create",
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

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
