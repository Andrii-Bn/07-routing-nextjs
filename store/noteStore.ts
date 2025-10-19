import { NoteDraft } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DraftNoteStore {
  note: NoteDraft;
  setDraft: (note: NoteDraft) => void;
  clearDraft: () => void;
}

const initialDraft: NoteDraft = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useDraftNote = create<DraftNoteStore>()(
  persist(
    (set) => ({
      note: initialDraft,
      setDraft: (note: NoteDraft) =>
        set((prevState) => ({ note: { ...prevState.note, ...note } })),
      clearDraft: () => set({ note: initialDraft }),
    }),
    { name: "draftNote" }
  )
);
