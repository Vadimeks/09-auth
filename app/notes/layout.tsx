// app/notes/layout.tsx
import React from "react";

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
  // modal: React.ReactNode;
}) {
  return <div>{children}</div>;
}
