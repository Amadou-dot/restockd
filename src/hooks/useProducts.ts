import { useQuery } from '@tanstack/react-query';
import { fetchProducts, productKeys, ApiError } from '../lib/api';

export const useProducts = (page: number = 1) => {
  return useQuery({
    queryKey: productKeys.list(page),
    queryFn: () => fetchProducts(page),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime)
    retry: (failureCount, error) => {
      // Don't retry on client errors (4xx)
      if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
        return false;
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
