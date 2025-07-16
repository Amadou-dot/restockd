import { isClientError } from '@/utils/isClientError';
import { useQuery } from '@tanstack/react-query';
import { cartKeys, fetchCart } from '../lib/api';

export const useCart = () => {
  return useQuery({
    queryKey: cartKeys.all,
    queryFn: () => fetchCart(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime)
    retry: (failureCount, error) => {
      // Don't retry on client errors (4xx)
      if (isClientError(error)) return false;

      return failureCount < 3;
    },
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
