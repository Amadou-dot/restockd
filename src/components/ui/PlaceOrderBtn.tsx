import { Button } from '@heroui/button';
import { addToast } from '@heroui/toast';
import { usePlaceOrder } from '../../hooks/useOrders';

export default function PlaceOrderBtn() {
  const { mutate: placeOrder, isPending, isError } = usePlaceOrder();

  const handlePlaceOrder = async () => {
    placeOrder(undefined, {
      onSuccess: (data: { url?: string; id?: string }) => {
        // Check if we have a valid URL
        if (data?.url) window.location.href = data.url!;
        else {
          // No URL returned - show error
          addToast({
            title: 'Configuration Error',
            description:
              'Payment system is not properly configured. Please contact support.',
            color: 'warning',
          });
        }
      },
      onError: error => {
        console.error('Error placing order:', error);
        addToast({
          title: 'Order Failed',
          description:
            'There was an error creating your order. Please try again.',
          color: 'danger',
        });
      },
    });
  };

  const getButtonText = () => {
    if (isPending) return 'Creating Order...';
    if (isError) return 'Try Again';
    return 'Place Order & Pay';
  };

  return (
    <Button
      className='w-full font-semibold'
      color='primary'
      disabled={isPending}
      isLoading={isPending}
      radius='sm'
      size='lg'
      type='submit'
      onPress={handlePlaceOrder}>
      {getButtonText()}
    </Button>
  );
}
