/* app/notes/filter/[...slug]/page.tsx */
import NotesClient from "./Notes.client";
import type { Tag } from "@/types/note";
import { type Metadata } from "next";

const validTags: Tag[] = [
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
  "Ideas",
  "Travel",
  "Finance",
  "Health",
  "Important",
  "All",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
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
  };
}

export default async function NotesPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const resolvedParams = await params;
  const slugTag =
    resolvedParams.slug &&
    resolvedParams.slug.length > 0 &&
    resolvedParams.slug[0] !== "all"
      ? resolvedParams.slug[0]
      : "All";
  const tag: Tag = validTags.includes(slugTag as Tag)
    ? (slugTag as Tag)
    : "All";

  // Выкарыстоўвай NotesClient, перадай tag
  return <NotesClient tag={tag} />;
}
