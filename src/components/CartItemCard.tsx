import { useUpdateQuantity } from '@/hooks/useUpdateQuantity';
import { Button } from '@heroui/button';
import { Card, CardBody } from '@heroui/card';
import { Image } from '@heroui/image';
import { FaBookmark, FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
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
        <div className='flex flex-col md:flex-row gap-4'>
          {/* Product Image */}
          <div className='flex-shrink-0 self-center md:self-start'>
            <Image
              alt={product.name}
              className='object-cover'
              radius='none'
              shadow='sm'
              src={product.image}
              width={140}
              height={200}
            />
          </div>

          {/* Product Details */}
          <div className='flex-1 min-w-0 space-y-3'>
            {/* Mobile Layout: Title, Price, Modify Buttons stacked */}
            <div className='block md:hidden space-y-3'>
              {/* Title and Price on same line */}
              <div className='flex items-center justify-between'>
                <h3 className='text-lg font-semibold truncate pr-4'>
                  {product.name}
                </h3>
                <div className='text-right flex-shrink-0'>
                  <span className='text-lg font-bold'>
                    ${totalPrice.toFixed(2)}
                  </span>
                  {item.quantity > 1 && (
                    <div className='text-sm text-gray-400'>
                      (${product.price.toFixed(2)} each)
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className='text-sm text-gray-200 line-clamp-2 mb-6'>
                {product.description}
              </p>

              {/* Action buttons row */}
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  {canModify && (
                    <>
                      <Button
                        onPress={decrementQuantity}
                        color='primary'
                        size='sm'
                        isIconOnly
                        disabled={item.quantity <= 1}>
                        <FaMinus size={10} />
                      </Button>
                      <span className='min-w-[2rem] text-center font-semibold'>
                        {item.quantity}
                      </span>
                      <Button
                        onPress={incrementQuantity}
                        disabled={item.quantity >= 99}
                        color='primary'
                        size='sm'
                        isIconOnly>
                        <FaPlus size={10} />
                      </Button>
                    </>
                  )}
                </div>

                <div className='flex items-center gap-2'>
                  <Button
                    color='secondary'
                    size='sm'
                    variant='bordered'
                    isIconOnly>
                    <FaBookmark size={12} />
                  </Button>
                  <Button
                    color='danger'
                    size='sm'
                    variant='bordered'
                    isIconOnly>
                    <FaTrash size={12} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className='hidden md:block space-y-3'>
              {/* Title and Price on same line */}
              <div className='flex items-center justify-between'>
                <h3 className='text-lg font-semibold truncate pr-4'>
                  {product.name}
                </h3>
                <div className='text-right flex-shrink-0'>
                  <span className='text-lg font-bold'>
                    ${totalPrice.toFixed(2)}
                  </span>
                  {item.quantity > 1 && (
                    <div className='text-sm text-gray-400'>
                      (${product.price.toFixed(2)} each)
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className='text-sm text-gray-200 line-clamp-2'>
                {product.description}
              </p>

              {/* Action buttons row */}
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  {canModify && (
                    <>
                      <Button
                        onPress={decrementQuantity}
                        color='primary'
                        size='sm'
                        isIconOnly
                        disabled={item.quantity <= 1}>
                        <FaMinus size={10} />
                      </Button>
                      <span className='min-w-[2rem] text-center font-semibold'>
                        {item.quantity}
                      </span>
                      <Button
                        onPress={incrementQuantity}
                        disabled={item.quantity >= 99}
                        color='primary'
                        size='sm'
                        isIconOnly>
                        <FaPlus size={10} />
                      </Button>
                    </>
                  )}
                </div>

                <div className='flex items-center gap-2'>
                  <Button
                    color='secondary'
                    size='sm'
                    variant='bordered'
                    isIconOnly>
                    <FaBookmark size={12} />
                  </Button>
                  <Button
                    color='danger'
                    size='sm'
                    variant='bordered'
                    isIconOnly>
                    <FaTrash size={12} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
