import { useUpdateQuantity } from '@/hooks/useUpdateQuantity';
import { Button } from '@heroui/button';
import { Card, CardBody } from '@heroui/card';
import { Image } from '@heroui/image';
import { FaMinus, FaPlus } from 'react-icons/fa';
import type { PopulatedCartItem } from '../types/Cart';

export default function CartItemCard({
  item,
  canModify = true,
}: {
  item: PopulatedCartItem;
  canModify?: boolean;
}) {
  const product = item.product;
  const totalPrice = product.price * item.quantity;
  const { mutate: updateQuantity } = useUpdateQuantity();
  const incrementQuantity = () => {
    if (canModify) {
      updateQuantity({ itemId: item.product._id, action: 'increment' });
    }
  };

  const decrementQuantity = () => {
    if (canModify) {
      updateQuantity({ itemId: item.product._id, action: 'decrement' });
    }
  };

  return (
    <Card
      className='hover:shadow-md transition-shadow duration-200'
      radius='none'
      shadow='sm'>
      <CardBody>
        <div className='flex items-stretch'>
          {/* Product Image */}
          <div className='flex-shrink-0'>
            <Image
              alt={product.name}
              className='object-cover h-full'
              radius='none'
              shadow='sm'
              src={product.image}
              width={80}
            />
          </div>
          {/* Product Details */}
          <div className='flex-1 min-w-0 px-4'>
            <div className='flex items-center justify-between'>
              <h3 className='text-lg font-semibold truncate'>{product.name}</h3>
              <div className='flex items-center gap-2'>
                {canModify && (
                  <>
                    <Button
                      onPress={decrementQuantity}
                      color='primary'
                      size='sm'
                      disabled={item.quantity <= 1}>
                      <FaMinus size={12} />
                    </Button>
                    <p>{item.quantity}</p>
                    <Button
                      onPress={incrementQuantity}
                      disabled={item.quantity >= 99}
                      color='primary'
                      size='sm'>
                      <FaPlus size={12} />
                    </Button>
                  </>
                )}
              </div>
            </div>
            <p className='text-sm text-gray-200 mt-1 line-clamp-2'>
              {product.description}
            </p>
            <div className='flex items-center gap-2 mt-2'>
              <span className='text-lg font-bold'>
                ${totalPrice.toFixed(2)}
              </span>
              {item.quantity > 1 && (
                <span className='text-sm text-gray-400'>
                  (${product.price.toFixed(2)} each)
                </span>
              )}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
