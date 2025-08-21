// app/@modal/(.)notes/[id]/page.tsx
import { QueryClient, dehydrate } from "@tanstack/react-query";
import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import ModalContainer from "./modal";
import { fetchNoteById } from "@/lib/api";

export default async function InterceptedNoteDetailsPage({
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
    <ModalContainer>
      <TanStackProvider dehydratedState={dehydratedState}>
        <NoteDetailsClient />
      </TanStackProvider>
    </ModalContainer>
  );
}
