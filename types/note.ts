// types/note.ts

export type Tag =
  | "Todo"
  | "Work"
  | "Personal"
  | "Meeting"
  | "Shopping"
  | "Ideas"
  | "Travel"
  | "Finance"
  | "Health"
  | "Important"
  | "All";

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: Tag;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  total: number;
  page: number;
  perPage: number;
}
