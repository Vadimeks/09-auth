// app/(private-routes)/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NoteHub | Private",
  description: "Private routes for NoteHub users",
};

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
