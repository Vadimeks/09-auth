// lib/store/noteStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Tag } from "../../types/note";

export interface DraftNote {
  title: string;
  content: string;
  tag: Tag;
}

const initialDraft: DraftNote = {
  title: "",
  content: "",
  tag: "Todo",
};

interface DraftStore {
  draft: DraftNote;
  setDraft: (note: DraftNote) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<DraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set({ draft: note }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft-storage",
    }
  )
);
