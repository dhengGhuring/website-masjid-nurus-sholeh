// src/providers.tsx
'use client'

import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from 'next/navigation'
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  // useState agar QueryClient tidak dibuat ulang saat re-render
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Data dianggap segar selama 5 menit
        staleTime: 5 * 60 * 1000,
        // Cache disimpan di memori selama 10 menit sebelum dihapus (garbage collection)
        gcTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider navigate={router.push}>
        {children}
      </HeroUIProvider>
    </QueryClientProvider>
  )
}
