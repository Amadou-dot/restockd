import { cartKeys, updateCartItemQuantity } from '@/lib/api';
import type { PopulatedCart, PopulatedCartItem } from '@/types/Cart';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CartItemUpdate {
  itemId: string;
  action: 'increment' | 'decrement';
}

export const useUpdateQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ itemId, action }: CartItemUpdate) =>
      updateCartItemQuantity(itemId, action),
    mutationKey: ['updateCartItemQuantity'],

    // Optimistic update - immediately update UI before server response
    onMutate: async ({ itemId, action }: CartItemUpdate) => {
      // Cancel any outgoing refetches (so they don't overwrite the optimistic update)
      await queryClient.cancelQueries({ queryKey: cartKeys.all });

      // Snapshot the previous value
      const previousCart = queryClient.getQueryData<PopulatedCart>(
        cartKeys.all
      );

      // Optimistically update the cart
      if (previousCart) {
        const updatedCart = { ...previousCart };
        const itemIndex = updatedCart.items.findIndex(
          (item: PopulatedCartItem) => item.product._id === itemId
        );

        if (itemIndex !== -1) {
          const item = { ...updatedCart.items[itemIndex] };

          if (action === 'increment') {
            item.quantity += 1;
            updatedCart.totalQuantity += 1;
            updatedCart.totalPrice += item.product.price;
          } else if (action === 'decrement' && item.quantity > 1) {
            item.quantity -= 1;
            updatedCart.totalQuantity -= 1;
            updatedCart.totalPrice -= item.product.price;
          } else if (action === 'decrement' && item.quantity === 1) {
            // Remove item if quantity would become 0
            updatedCart.items.splice(itemIndex, 1);
            updatedCart.totalQuantity -= 1;
            updatedCart.totalPrice -= item.product.price;
          }

          // Update the item in the array if it wasn't removed
          if (item.quantity > 0) {
            updatedCart.items[itemIndex] = item;
          }
        }

        // Set the optimistic update
        queryClient.setQueryData(cartKeys.all, updatedCart);
      }

      // Return a context object with the snapshotted value
      return { previousCart };
    },

    onError: (error, _variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousCart) {
        queryClient.setQueryData(cartKeys.all, context.previousCart);
      }
      console.error(`Error during quantity update operation:`, error);
    },

    onSuccess: () => {
      // Invalidate and refetch cart data to ensure consistency
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
  });
};
