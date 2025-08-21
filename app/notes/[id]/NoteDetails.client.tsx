// app/notes/[id]/NoteDetails.client.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/api";
import css from "@/app/notes/[id]/NoteDetails.module.css";
import type { Note } from "@/types/note";
import { useEffect } from "react";

export default function NoteDetailsClient() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (note) {
      document.title = `NoteHub - ${note.title}`;
    }
  }, [note]);

  const handleBackClick = () => {
    router.back();
  };

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (isError) {
    return <p>Something went wrong. {error.message}</p>;
  }

  if (!note) {
    return <p>Note not found.</p>;
  }

  return (
    <div className={css.container}>
      <button className={css.backBtn} onClick={handleBackClick}>
        Go back
      </button>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          Created: {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
