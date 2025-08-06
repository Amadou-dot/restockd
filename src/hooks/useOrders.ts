import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cartKeys, fetchOrders, orderKeys, placeOrder, completeOrder } from '../lib/api';

interface PlaceOrderResponse {
  url?: string;
  id?: string;
}

// place order hook
export const usePlaceOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<PlaceOrderResponse, Error, undefined>({
    mutationFn: async (): Promise<PlaceOrderResponse> => {
      // Call the actual API endpoint
      const response = await placeOrder();
      return response;
    },
    onSuccess: () => {
      // Clear cart after successful order
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
      // Also invalidate orders to refresh the orders list
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
    },
    onError: error => {
      console.error('Error placing order:', error);
    },
  });
};

// Complete order hook for success page
export const useCompleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<{ orderId: string; totalPrice: number; itemCount: number; invoiceUrl?: string }, Error, string>({
    mutationFn: async (sessionId: string) => {
      const response = await completeOrder(sessionId);
      return response;
    },
    onSuccess: () => {
      // Clear cart and refresh orders after successful order completion
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
    },
    onError: error => {
      console.error('Error completing order:', error);
    },
  });
};

export const useOrders = () => {
  return useQuery({
    queryFn: async () => {
      const orders = await fetchOrders();
      return orders || []; // Ensure we always return an array
    },
    queryKey: orderKeys.all,
  });
};
