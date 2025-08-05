import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminProductKeys } from '../lib/api';

const ADMIN_API_BASE = '/api/admin';

// Mutation hooks for CRUD operations
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productData: FormData) => {
      const response = await fetch(`${ADMIN_API_BASE}/addProduct`, {
        method: 'POST',
        body: productData,
      });

      if (!response.ok) {
        // get the error message from the response
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create product');
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: adminProductKeys.all });
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
        queryKey: adminProductKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: adminProductKeys.all });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${ADMIN_API_BASE}/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate products list
      queryClient.invalidateQueries({ queryKey: adminProductKeys.all });
    },
  });
};
