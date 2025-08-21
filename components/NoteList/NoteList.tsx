"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "@/types/note";
import styles from "@/components/NoteList/NoteList.module.css";
import toast from "react-hot-toast";
import Link from "next/link";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (noteId: string) => {
      // Замест імпарту deleteNote, мы выклікаем наш Next.js API маршрут.
      const res = await fetch(`/api/notes/${noteId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete note.");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Error deleting note: ${error.message}`);
    },
  });

  const handleDelete = (id: string) => {
    mutation.mutate(id);
  };

  return (
    <ul className={styles.list}>
      {notes.map((note) => (
        <li key={note.id} className={styles.listItem}>
          <h3 className={styles.title}>{note.title}</h3>
          <p className={styles.content}>{note.content}</p>
          <div className={styles.footer}>
            <span className={styles.tag}>{note.tag}</span>
            <Link href={`/notes/${note.id}`} className={styles.link}>
              View details
            </Link>
            <button
              className={styles.button}
              onClick={() => handleDelete(note.id)}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
