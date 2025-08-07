'use client';

import ErrorMessage from '@/components/ErrorMessage';
import Message from '@/components/Message';
import { useAddToCart } from '@/hooks/useAddToCart';
import { useProduct } from '@/hooks/useProduct';
import { Button } from '@heroui/button';
import { Image } from '@heroui/image';
import { Spinner } from '@heroui/spinner';
import { addToast } from '@heroui/toast';
import { useParams, useRouter } from 'next/navigation';
import { IoArrowBack, IoCartOutline, IoHeartOutline } from 'react-icons/io5';

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const router = useRouter();

  const { data: product, isPending, error } = useProduct(productId);
  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();

  // Mock auth data - replace with actual auth hook
  const authData = { isLoggedIn: true };
  const isLoggedIn = authData?.isLoggedIn || false;

  const handleAddToCart = () => {
    if (isAddingToCart) return; // Prevent multiple clicks while pending

    addToCart(productId, {
      onSuccess: () => {
        addToast({
          title: 'Item added to cart',
          description: 'The item has been successfully added to your cart.',
          color: 'success',
        });
      },
      onError: error => {
        addToast({
          title: 'Failed to add to cart',
          description:
            error instanceof Error
              ? error.message
              : 'There was an error adding the item to your cart. Please try again.',
          color: 'danger',
        });
      },
    });
  };

  if (isPending) {
    return (
      <div className='w-full flex items-center justify-center px-4 py-8'>
        <Spinner title='Loading product...' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='w-full mx-auto px-4 py-8'>
        <ErrorMessage
          description={
            error instanceof Error ? error.message : 'Failed to load product'
          }
        />
      </div>
    );
  }

  if (!product) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <Message title='Product not found' />
      </div>
    );
  }

  return (
    <div className='min-h-screen max-h-screen'>
      {/* Header with back button */}
      <div className='border-b border-gray-800'>
        <div className='container mx-auto px-4 py-4'>
          <Button
            variant='light'
            startContent={<IoArrowBack />}
            onPress={() => router.back()}
            className='mb-2'>
            Back to Products
          </Button>
        </div>
      </div>

      {/* Main product content */}
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 rounded-lg p-8'>
            {/* Product Image */}
            <div className='flex justify-center'>
              <Image
                alt={product.name}
                className='w-full max-w-md object-cover rounded-lg'
                src={product.image}
                width='100%'
                height='500'
              />
            </div>

            {/* Product Details */}
            <div className='flex flex-col gap-6'>
              <div>
                <h1 className='text-3xl font-bold text-white mb-2'>
                  {product.name}
                </h1>
                <p className='text-4xl font-bold text-yellow-600'>
                  ${product.price.toFixed(2)}
                </p>
              </div>

              <div>
                <h2 className='text-xl font-semibold text-white mb-3'>
                  Description
                </h2>
                <p className='text-gray-300 leading-relaxed'>
                  {product.description}
                </p>
              </div>

              {/* Action buttons */}
              {isLoggedIn && (
                <div className='flex gap-4 items-center mt-6'>
                  <Button
                    color='primary'
                    size='lg'
                    className='flex-1'
                    startContent={<IoCartOutline />}
                    onPress={handleAddToCart}
                    isLoading={isAddingToCart}
                    isDisabled={isAddingToCart}>
                    {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                  </Button>
                  <Button
                    variant='bordered'
                    size='lg'
                    isIconOnly
                    className='text-red-500 border-red-500 hover:bg-red-50'>
                    <IoHeartOutline size={24} />
                  </Button>
                </div>
              )}

              {!isLoggedIn && (
                <div className='mt-6 p-4 bg-yellow-900/20 border border-yellow-600 rounded-lg'>
                  <p className='text-yellow-400'>
                    Please log in to add items to your cart
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
