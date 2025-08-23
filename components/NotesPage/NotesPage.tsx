/* components/NotePage/NotePage.tsx */
"use client";

import { useQuery } from "@tanstack/react-query";
import NoteList from "@/components/NoteList/NoteList";
// import type { Note } from "@/types/note";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { fetchNotes } from "@/lib/api/clientApi";

export default function NotesPage() {
  const {
    data: notes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const response = await fetchNotes(1, 12, "", "All");
      return response.notes;
    },
  });

  if (isLoading) {
    return (
      <div className="app">
        <div className="toolbar">
          <p>Loading notes...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="app">
        <div className="toolbar">
          <p style={{ color: "red" }}>Error loading notes.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="toolbar">
        <h2>My Notes</h2>
        <Link href="/notes/new" className="button">
          <PlusCircle size={20} />
          <span>New Note</span>
        </Link>
      </div>
      <NoteList notes={notes || []} />
    </div>
  );
}
