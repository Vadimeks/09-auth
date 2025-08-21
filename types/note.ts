// types/note.ts
export type Tag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping" | "All";

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: Tag;
  createdAt: string;
  updatedAt: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
