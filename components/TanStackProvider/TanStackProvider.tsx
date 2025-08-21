/* components/TanStackProvider/TanStackProvider.tsx */
"use client";

import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
  DehydratedState,
} from "@tanstack/react-query";
import React, { useState } from "react";

interface TanStackProviderProps {
  children: React.ReactNode;
  dehydratedState?: DehydratedState;
}

export default function TanStackProvider({
  children,
  dehydratedState,
}: TanStackProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {}
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}
