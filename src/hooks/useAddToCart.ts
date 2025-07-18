import { addToCart, cartKeys } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * A custom hook to add a product to the current user's cart.
 * @returns A mutation hook to add a product to the cart.
 * @example
 * const { mutate: addToCart } = useAddToCart();
 * addToCart(productId);
 */
export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => addToCart(productId),
    mutationKey: ['addToCart'],
    onSuccess: () => {
      // Invalidate the cart query to refresh the cart data
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
  });
}
