/* app/notes/filter/[...slug]/page.tsx */
import { type Metadata } from "next";
import { Toaster } from "react-hot-toast";
import NotesClient from "./Notes.client";
import type { Tag, FetchNotesResponse } from "@/types/note";

interface NotesPageProps {
  searchParams: Promise<{ page?: string; search?: string }>;
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const validTags: Tag[] = [
    "Todo",
    "Work",
    "Personal",
    "Meeting",
    "Shopping",
    "All",
  ];
  const slugTag =
    resolvedParams.slug &&
    resolvedParams.slug.length > 0 &&
    resolvedParams.slug[0] !== "all"
      ? resolvedParams.slug[0]
      : "All";
  const tag: Tag = validTags.includes(slugTag as Tag)
    ? (slugTag as Tag)
    : "All";

  return {
    title: `NoteHub - ${tag}`,
    description: `View notes filtered by ${tag} on NoteHub.`,
    openGraph: {
      title: `NoteHub - ${tag}`,
      description: `View notes filtered by ${tag} on NoteHub.`,
      url: `https://08-zustand-swart-three.vercel.app/notes/filter/${tag.toLowerCase()}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub Preview",
        },
      ],
    },
  };
}

export default async function NotesPage({
  searchParams,
  params,
}: NotesPageProps) {
  const resolvedSearchParams = await searchParams;
  const resolvedParams = await params;

  const pageParam = resolvedSearchParams.page;
  const searchParam = resolvedSearchParams.search;

  const page = pageParam ? Number(pageParam) : 1;
  const search = searchParam || "";

  const validTags: Tag[] = [
    "Todo",
    "Work",
    "Personal",
    "Meeting",
    "Shopping",
    "All",
  ];
  const slugTag =
    resolvedParams.slug &&
    resolvedParams.slug.length > 0 &&
    resolvedParams.slug[0] !== "all"
      ? resolvedParams.slug[0]
      : "All";

  const tag: Tag = validTags.includes(slugTag as Tag)
    ? (slugTag as Tag)
    : "All";

  const res = await fetch(
    `http://localhost:3000/api/notes?page=${page}&perPage=12&search=${search}&tag=${
      tag === "All" ? "" : tag
    }`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch notes.");
  }

  const notesData: FetchNotesResponse = await res.json();

  return (
    <>
      <NotesClient notesData={notesData} tag={tag} />
      <Toaster />
    </>
  );
}
