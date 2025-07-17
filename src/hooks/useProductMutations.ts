import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productKeys } from '../lib/api';

const ADMIN_API_BASE = '/api/admin';
// Future mutation hooks for CRUD operations
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productData: FormData) => {
      const response = await fetch(`${ADMIN_API_BASE}/addProduct`, {
        method: 'POST',
        body: productData,
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      const response = await fetch(`${ADMIN_API_BASE}/updateProduct/${id}`, {
        method: 'PUT',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      return response.json();
    },
    onSuccess: (_data, variables) => {
      // Invalidate specific product and products list
      queryClient.invalidateQueries({
        queryKey: productKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate products list
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
};
