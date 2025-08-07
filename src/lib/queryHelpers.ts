import type { QueryClient } from '@tanstack/react-query';
import { fetchProducts, fetchProduct, productKeys } from './api';

export const prefetchProducts = async (
  queryClient: QueryClient,
  page: number = 1
) => {
  await queryClient.prefetchQuery({
    queryKey: productKeys.list(page),
    queryFn: () => fetchProducts(page),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const prefetchProduct = async (queryClient: QueryClient, id: string) => {
  await queryClient.prefetchQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => fetchProduct(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
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
