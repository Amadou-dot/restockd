'use client';

import { APP_CONFIG } from '@/config/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { ReactNode } from 'react';
import { useState } from 'react';

interface QueryProviderProps {
  children: ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Set default staleTime above 0 to avoid refetching immediately on the client
            staleTime: APP_CONFIG.queryDefaults.staleTime,
            retry: APP_CONFIG.queryDefaults.retryAttempts,
            retryDelay: attemptIndex =>
              Math.min(
                APP_CONFIG.queryDefaults.retryBaseDelay * 2 ** attemptIndex,
                APP_CONFIG.queryDefaults.retryMaxDelay
              ),
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
