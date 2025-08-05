import { Button } from '@heroui/button';
import { FaTrash } from 'react-icons/fa6';

export default function RemoveCartItemBtn({}: { productId: string }) {
  const handleRemoveFromCart = () => {};
  return (
    <Button
      color='danger'
      // isLoading={isPending}
      radius='sm'
      size='sm'
      startContent={<FaTrash />}
      variant='light'
      onPress={handleRemoveFromCart}>
      Remove
    </Button>
  );
}
