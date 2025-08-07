import { APP_CONFIG } from '@/config/app';
import { useQuery } from '@tanstack/react-query';
import { ApiError, fetchProducts, productKeys } from '../lib/api';

export const useProducts = (page: number = 1) => {
  return useQuery({
    queryKey: productKeys.list(page),
    queryFn: () => fetchProducts(page),
    staleTime: APP_CONFIG.queryDefaults.staleTime,
    gcTime: APP_CONFIG.queryDefaults.gcTime,
    retry: (failureCount, error) => {
      // Don't retry on client errors (4xx)
      if (
        error instanceof ApiError &&
        error.status >= APP_CONFIG.errorThresholds.clientErrorMin &&
        error.status <= APP_CONFIG.errorThresholds.clientErrorMax
      ) {
        return false;
      }
      return failureCount < APP_CONFIG.queryDefaults.retryAttempts;
    },
    retryDelay: attemptIndex =>
      Math.min(
        APP_CONFIG.queryDefaults.retryBaseDelay * 2 ** attemptIndex,
        APP_CONFIG.queryDefaults.retryMaxDelay
      ),
  });
};
