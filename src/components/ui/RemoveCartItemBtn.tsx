import { Button } from '@heroui/button';
import { addToast } from '@heroui/toast';
import { FaTrash } from 'react-icons/fa6';

export default function RemoveCartItemBtn({
  productId,
}: {
  productId: string;
}) {
  const {
    mutate: removeItemFromCart,
    isPending,
    error,
  } = { mutate: (id: string) => {}, isPending: false, error: null }; // Mocked mutation
  if (error)
    addToast({
      title: 'Error',
      description: (error as unknown as Error)?.message || 'An error occurred',
      color: 'warning',
    });
  return (
    <Button
      color='danger'
      isLoading={isPending}
      radius='sm'
      size='sm'
      startContent={<FaTrash />}
      variant='light'
      onPress={() => removeItemFromCart(productId)}>
      Remove
    </Button>
  );
}
