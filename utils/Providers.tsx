'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { useState, type ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  // NOTE: It is better to create queryClient in a state to avoid recreation on re-renders, 
  // but keeping it simple for now as per existing code style.
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}