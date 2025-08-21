/* components/NotePage/NotePage.tsx */
"use client";

import { useQuery } from "@tanstack/react-query";
import NoteList from "@/components/NoteList/NoteList";
import type { Note } from "@/types/note";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

const mockFetchNotes = async (): Promise<Note[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [
    {
      id: "1",
      title: "Weekly Plan",
      content: "Complete the project, send the report, meet with the team.",
      createdAt: "2025-08-08T10:00:00Z",
      updatedAt: "2025-08-08T10:00:00Z",
      tag: "Work",
    },
    {
      id: "2",
      title: "Shopping List",
      content: "Milk, bread, eggs, vegetables, cheese.",
      createdAt: "2025-08-07T15:30:00Z",
      updatedAt: "2025-08-07T15:30:00Z",
      tag: "Shopping",
    },
    {
      id: "3",
      title: "NoteHub Ideas",
      content:
        "Add search functionality, change color scheme, add mobile version.",
      createdAt: "2025-08-06T08:00:00Z",
      updatedAt: "2025-08-06T08:00:00Z",
      tag: "Work",
    },
  ];
};

export default function NotesPage() {
  const {
    data: notes,
    isLoading,
    isError,
  } = useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: mockFetchNotes,
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
