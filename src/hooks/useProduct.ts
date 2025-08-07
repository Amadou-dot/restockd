import { APP_CONFIG } from '@/config/app';
import { isClientError } from '@/utils/isClientError';
import { useQuery } from '@tanstack/react-query';
import { fetchProduct, productKeys } from '../lib/api';

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => fetchProduct(id),
    enabled: !!id, // Only run query if id is provided
    staleTime: APP_CONFIG.queryDefaults.staleTime,
    gcTime: APP_CONFIG.queryDefaults.gcTime,
    retry: (failureCount, error) => {
      // Don't retry on client errors (4xx)
      if (isClientError(error)) return false;

      return failureCount < APP_CONFIG.queryDefaults.retryAttempts;
    },
    retryDelay: attemptIndex =>
      Math.min(
        APP_CONFIG.queryDefaults.retryBaseDelay * 2 ** attemptIndex,
        APP_CONFIG.queryDefaults.retryMaxDelay
      ),
  });
};
