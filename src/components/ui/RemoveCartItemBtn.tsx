import { Button } from '@heroui/button';
import { FaTrash } from 'react-icons/fa6';

export default function RemoveCartItemBtn({
  productId,
}: {
  productId: string;
}) {
  const handleRemoveFromCart = () => {
    console.log(`Removing product ${productId} from cart`);
  };
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
