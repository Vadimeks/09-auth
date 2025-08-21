// app/notesContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Note, Tag } from "@/types/note";

interface NotesContextType {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  uniqueTags: Tag[];
  setUniqueTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  activeTag: string | null;
  handleTagFilter: (tag: string | null) => void;
  filteredNotes: Note[];
}

export const NotesContext = createContext<NotesContextType | undefined>(
  undefined
);

export function useNotesContext() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error("useNotesContext must be used within a NotesProvider");
  }
  return context;
}

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [uniqueTags, setUniqueTags] = useState<Tag[]>([]);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredNotes = activeTag
    ? notes.filter((note) => note.tag.includes(activeTag as Tag))
    : notes;

  const handleTagFilter = (tag: string | null) => {
    setActiveTag(tag);
  };

  const value = {
    notes,
    setNotes,
    uniqueTags,
    setUniqueTags,
    activeTag,
    handleTagFilter,
    filteredNotes,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};
