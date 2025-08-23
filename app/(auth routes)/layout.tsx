// app/(auth routes)/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NoteHub | Auth",
  description: "Authentication routes for NoteHub users",
};

export default function AuthRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
