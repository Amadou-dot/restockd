import { isClientError } from '@/utils/isClientError';
import { useQuery } from '@tanstack/react-query';
import { fetchProduct, productKeys } from '../lib/api';

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => fetchProduct(id),
    enabled: !!id, // Only run query if id is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (cacheTime)
    retry: (failureCount, error) => {
      // Don't retry on client errors (4xx)
      if (isClientError(error)) return false;

      return failureCount < 3;
    },
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // exponential backoff
  });
};
