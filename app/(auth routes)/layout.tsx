// app/(auth routes)/layout.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import type { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'NoteHub | Auth',
//   description: 'Auth routes for NoteHub users',
// };
type Props = {
  children: React.ReactNode;
};
export default function AuthLayout({ children }: Props) {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    // refresh викличе перезавантаження даних
    router.refresh();
    setLoading(false);
  }, [router]);

  return <>{loading ? <div>Loading...</div> : children}</>;
}
