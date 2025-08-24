// app/(auth routes)/layout.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import type { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'NoteHub | Auth',
//   description: 'Auth routes for NoteHub users',
// };

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return <>{children}</>;
}
