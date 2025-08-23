// app/(private-routes)/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NoteHub | Auth",
  description: "Auth routes for NoteHub users",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
