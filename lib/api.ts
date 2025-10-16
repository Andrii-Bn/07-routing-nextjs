import axios from "axios";
import type { Note, CreateNoteRequest } from "../types/note";

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

interface NotesResponseOptions {
  params: {
    search: string;
    tag?: string;
    page: number;
    perPage: number;
  };
}

axios.defaults.baseURL = "https://next-docs-9f0504b0a741.herokuapp.com";
axios.defaults.headers.common["Authorization"] = `Bearer ${
  process.env.NEXT_PUBLIC_NOTEHUB_TOKEN
}`;

export async function fetchNotes(
  searchWord: string,
  page: number,
  tag?: string
) {
  if (tag === "All") {
    tag = undefined;
  }

  const options: NotesResponseOptions = {
    params: {
      search: searchWord,
      tag: tag,
      page: page,
      perPage: 12,
    },
  };

  const res = await axios.get<NotesResponse>("/notes", options);
  return res.data;
}

export async function fetchNoteById(id: string) {
  const res = await axios.get<Note>(`/notes/${id}`);
  return res.data;
}

export async function createNote(data: CreateNoteRequest) {
  const res = await axios.post<Note>("/notes", data);
  return res.data;
}

export async function deleteNote(id: string) {
  const res = await axios.delete<Note>(`/notes/${id}`);
  return res.data;
}
