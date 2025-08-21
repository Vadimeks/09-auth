// app/notes/[id]/page.tsx
import { QueryClient, dehydrate } from "@tanstack/react-query";
import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";
import { fetchNoteById } from "@/lib/api";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { type Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  try {
    const note = await fetchNoteById(id);
    const description =
      note.content.length > 100
        ? note.content.slice(0, 97) + "..."
        : note.content;

    return {
      title: `NoteHub - ${note.title}`,
      description: `Read more about ${note.title}: ${description}`,
      openGraph: {
        title: `NoteHub - ${note.title}`,
        description: `Read more about ${note.title}: ${description}`,
        url: `https://08-zustand-swart-three.vercel.app/notes/${id}`,
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
  } catch {
    return {
      title: "NoteHub - Note Not Found",
      description: "The note you are looking for does not exist on NoteHub.",
      openGraph: {
        title: "NoteHub - Note Not Found",
        description: "The note you are looking for does not exist on NoteHub.",
        url: `https://08-zustand-swart-three.vercel.app/notes/${id}`,
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
}

export default async function NoteDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <TanStackProvider dehydratedState={dehydratedState}>
      <NoteDetailsClient />
    </TanStackProvider>
  );
}
