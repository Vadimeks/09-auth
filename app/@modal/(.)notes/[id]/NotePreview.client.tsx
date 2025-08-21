// app/@modal/(.)notes/[id]/NotePreview.client.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";
import Modal from "@/components/Modal/Modal";
import css from "@/components/NotePreview/NotePreview.module.css";

export default function NotePreview() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const handleClose = () => {
    router.back();
  };

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note, Error>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    refetchOnMount: false,
  });

  if (isLoading) {
    return (
      <Modal isOpen={true} onClose={handleClose}>
        <div className={css.container}>
          <p>Loading, please wait...</p>
        </div>
      </Modal>
    );
  }

  if (isError) {
    return (
      <Modal isOpen={true} onClose={handleClose}>
        <div className={css.container}>
          <p>Something went wrong. Could not load the note.</p>
        </div>
      </Modal>
    );
  }

  if (!note) {
    return (
      <Modal isOpen={true} onClose={handleClose}>
        <div className={css.container}>
          <p>Note not found.</p>
        </div>
      </Modal>
    );
  }

  const formattedDate = format(new Date(note.createdAt), "dd MMM yyyy, HH:mm");

  return (
    <Modal isOpen={true} onClose={handleClose}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <span className={css.tag}>{note.tag}</span>
          </div>
          <p className={css.content}>{note.content}</p>
          <span className={css.date}>{formattedDate}</span>
        </div>
      </div>
    </Modal>
  );
}
