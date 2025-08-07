import { APP_CONFIG } from '@/config/app';
import type { QueryClient } from '@tanstack/react-query';
import { fetchProduct, fetchProducts, productKeys } from './api';

export const prefetchProducts = async (
  queryClient: QueryClient,
  page: number = 1
) => {
  await queryClient.prefetchQuery({
    queryKey: productKeys.list(page),
    queryFn: () => fetchProducts(page),
    staleTime: APP_CONFIG.queryDefaults.staleTime,
  });
};

export const prefetchProduct = async (queryClient: QueryClient, id: string) => {
  await queryClient.prefetchQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => fetchProduct(id),
    staleTime: APP_CONFIG.queryDefaults.staleTime,
  });
};

export const invalidateProducts = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({
    queryKey: productKeys.all,
  });
};

export const invalidateProduct = (queryClient: QueryClient, id: string) => {
  queryClient.invalidateQueries({
    queryKey: productKeys.detail(id),
  });
};
