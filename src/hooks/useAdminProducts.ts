import { useQuery } from '@tanstack/react-query';
import { fetchProducts, adminProductKeys, ApiError } from '../lib/api';

export const useAdminProducts = (page: number = 1) => {
  return useQuery({
    queryKey: adminProductKeys.list(page),
    queryFn: () => fetchProducts(page),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (cacheTime)
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
