// components/NoteForm/NoteForm.tsx
"use client";

import { createNote } from "@/lib/api/api";
import type { Tag } from "@/types/note";
import styles from "./NoteForm.module.css";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useNoteStore } from "@/lib/store/noteStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function NoteForm() {
  const allTags: Tag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteStore();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      toast.success("Note created successfully!");
      router.push("/");
    },
    onError: (error: Error) => {
      toast.error(`Error creating note: ${error.message}`);
    },
  });

  const handleDraftChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setDraft({ ...draft, [name]: value });
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!draft.title || draft.title.length < 3 || draft.title.length > 50) {
      toast.error("Title must be between 3 and 50 characters.");
      return;
    }

    if (draft.content.length > 500) {
      toast.error("Content must be at most 500 characters.");
      return;
    }

    mutation.mutate(draft);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="note-title">Title</label>
        <input
          id="note-title"
          name="title"
          type="text"
          className={styles.input}
          required
          value={draft.title}
          onChange={handleDraftChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="note-content">Content</label>
        <textarea
          id="note-content"
          name="content"
          className={styles.textarea}
          rows={5}
          value={draft.content}
          onChange={handleDraftChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="note-tag">Tag</label>
        <select
          id="note-tag"
          name="tag"
          className={styles.select}
          value={draft.tag}
          onChange={handleDraftChange}
        >
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Creating..." : "Create Note"}
        </button>
      </div>
    </form>
  );
}
