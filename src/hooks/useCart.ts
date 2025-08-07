import { APP_CONFIG } from '@/config/app';
import { isClientError } from '@/utils/isClientError';
import { useQuery } from '@tanstack/react-query';
import { cartKeys, fetchCart } from '../lib/api';

export const useCart = () => {
  return useQuery({
    queryKey: cartKeys.all,
    queryFn: () => fetchCart(),
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
