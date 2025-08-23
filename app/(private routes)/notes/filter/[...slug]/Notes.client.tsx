// notes/filter/[...slug]/Notes.client.tsx
"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Loader from "@/components/Loader/Loader";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { fetchNotes } from "@/lib/api/clientApi";
import type { Tag } from "@/types/note";
import css from "./page.module.css";

interface NotesClientProps {
  tag: Tag;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [debouncedQuery] = useDebounce(query, 500);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["notes", debouncedQuery, page, tag],
    queryFn: () =>
      fetchNotes(page, 12, debouncedQuery, tag === "All" ? undefined : tag),
    placeholderData: keepPreviousData,
    retry: 1,
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
