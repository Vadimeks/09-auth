// notes/filter/[...slug]/Notes.client.tsx
"use client";

import { useState, useEffect } from "react";
import {
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { Toaster } from "react-hot-toast";
import Link from "next/link";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Loader from "@/components/Loader/Loader";

import { fetchNotes } from "@/lib/api/api";
import type { FetchNotesResponse, Tag } from "@/types/note";
import css from "./page.module.css";

interface NotesClientProps {
  notesData: FetchNotesResponse;
  tag: Tag;
}

export default function NotesClient({ notesData, tag }: NotesClientProps) {
  const queryClient = useQueryClient();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [debouncedQuery] = useDebounce(query, 500);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["notes", debouncedQuery, page, tag],
    });
  }, [tag, debouncedQuery, page, queryClient]);

  const { data, isLoading, isFetching } = useQuery<FetchNotesResponse, Error>({
    queryKey: ["notes", debouncedQuery, page, tag],
    queryFn: () =>
      fetchNotes(page, 12, debouncedQuery, tag === "All" ? undefined : tag),
    enabled: true,
    placeholderData: keepPreviousData,
    retry: 1,
    initialData: notesData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
  };

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };

  const notesToShow = data?.notes || [];
  const showLoader = isLoading || isFetching;

  return (
    <div>
      <Toaster />
      <main className={css.app}>
        <div className={css.toolbar}>
          <SearchBox onSearch={handleSearch} initialQuery={query} />
          <Link href="/notes/action/create" className={css.button}>
            Create note +
          </Link>
        </div>

        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            onPageChange={handlePageChange}
            currentPage={page}
          />
        )}
        {showLoader && <Loader />}
        {notesToShow.length > 0 && <NoteList notes={notesToShow} />}
        {!showLoader && notesToShow.length === 0 && <p>No notes found.</p>}
      </main>
    </div>
  );
}
