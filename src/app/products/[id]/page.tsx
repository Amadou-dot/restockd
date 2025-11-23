'use client';

import ErrorMessage from '@/components/ErrorMessage';
import Message from '@/components/Message';
import ProductCard from '@/components/ProductCard';
import { useAddToCart } from '@/hooks/useAddToCart';
import { useProduct } from '@/hooks/useProduct';
import { useProducts } from '@/hooks/useProducts';
import { BreadcrumbItem, Breadcrumbs } from '@heroui/breadcrumbs';
import { Button } from '@heroui/button';
import { Card, CardBody } from '@heroui/card';
import { Image } from '@heroui/image';
import { Spinner } from '@heroui/spinner';
import { addToast } from '@heroui/toast';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  IoArrowBack,
  IoCartOutline,
  IoCheckmarkCircle,
  IoHeartOutline,
  IoShieldCheckmarkOutline,
  IoStar,
  IoStarHalf,
  IoTimeOutline,
  IoCubeOutline,
} from 'react-icons/io5';

const NUM_RELATED_PRODUCTS = 4;
// Multiplier used to show a mock "original" price (e.g. 20% higher than current)
const PRICE_MULTIPLIER = 1.2;

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('description');

  const { data: product, isPending, error } = useProduct(productId);
  const { data: productsData } = useProducts(1); // Fetch first page for related products
  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();

  // Mock auth data - replace with actual auth hook
  const authData = { isLoggedIn: true };
  const isLoggedIn = authData?.isLoggedIn || false;

  const handleAddToCart = () => {
    if (isAddingToCart) return;

    addToCart(productId, {
      onSuccess: () => {
        addToast({
          title: 'Item added to cart',
          description: `${product?.name} has been added to your cart.`,
          color: 'success',
        });
      },
      onError: error => {
        addToast({
          title: 'Failed to add to cart',
          description:
            error instanceof Error
              ? error.message
              : 'There was an error adding the item to your cart.',
          color: 'danger',
        });
      },
    });
  };

  if (isPending) {
    return (
      <div className='w-full h-[60vh] flex items-center justify-center'>
        <Spinner size='lg' label='Loading product details...' color='primary' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='container mx-auto px-4 py-12'>
        <ErrorMessage
          description={
            error instanceof Error ? error.message : 'Failed to load product'
          }
        />
        <Button
          variant='light'
          startContent={<IoArrowBack />}
          onPress={() => router.back()}
          className='mt-4'>
          Go Back
        </Button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className='container mx-auto px-4 py-12'>
        <Message title='Product not found' />
        <Button
          variant='light'
          startContent={<IoArrowBack />}
          onPress={() => router.back()}
          className='mt-4'>
          Go Back
        </Button>
      </div>
    );
  }

  // Filter related products (exclude current product)

  const relatedProducts =
    productsData?.products
      .filter(p => p._id !== productId)
      .slice(0, NUM_RELATED_PRODUCTS) || [];

  return (
    <div className='min-h-screen pb-12 bg-background'>
      {/* Breadcrumbs */}
      <div className='container mx-auto px-4 py-6'>
        <Breadcrumbs size='lg'>
          <BreadcrumbItem href='/'>Home</BreadcrumbItem>
          <BreadcrumbItem href='/products'>Products</BreadcrumbItem>
          <BreadcrumbItem>{product.name}</BreadcrumbItem>
        </Breadcrumbs>
      </div>

      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16'>
          {/* Product Image Section */}
          <div className='relative group'>
            <Card className='border-none shadow-none bg-transparent'>
              <CardBody className='p-0 overflow-hidden rounded-2xl bg-content2/50'>
                <div className='aspect-square w-full flex items-center justify-center p-6'>
                  <Image
                    alt={product.name}
                    className='w-full h-full object-contain hover:scale-105 transition-transform duration-500'
                    src={product.image}
                    width={600}
                    height={600}
                  />
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Product Info Section */}
          <div className='flex flex-col gap-6'>
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <span className='px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full'>
                  In Stock
                </span>
                <div className='flex items-center text-yellow-400 text-sm'>
                  <IoStar />
                  <IoStar />
                  <IoStar />
                  <IoStar />
                  <IoStarHalf />
                  <span className='text-default-500 ml-2'>(4.5/5)</span>
                </div>
              </div>

              <h1 className='text-4xl font-bold text-foreground mb-4'>
                {product.name}
              </h1>

              <div className='flex items-end gap-4 mb-6'>
                <p className='text-5xl font-bold text-primary'>
                  ${product.price.toFixed(2)}
                </p>
                {/* Mock original price */}
                <p className='text-xl text-default-400 line-through mb-2'>
                  ${(product.price * PRICE_MULTIPLIER).toFixed(2)}
                </p>
              </div>

              <p className='text-default-500 text-lg leading-relaxed mb-8'>
                {product.description}
              </p>
            </div>

            {/* Features Grid */}
            <div className='grid grid-cols-2 gap-4 mb-8'>
              <div className='flex items-center gap-3 p-3 rounded-lg bg-content2/50'>
                <IoCubeOutline className='text-2xl text-primary' />
                <div>
                  <p className='font-semibold text-sm'>Free Shipping</p>
                  <p className='text-xs text-default-500'>
                    On orders over $100
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-3 p-3 rounded-lg bg-content2/50'>
                <IoShieldCheckmarkOutline className='text-2xl text-primary' />
                <div>
                  <p className='font-semibold text-sm'>2 Year Warranty</p>
                  <p className='text-xs text-default-500'>Full coverage</p>
                </div>
              </div>
              <div className='flex items-center gap-3 p-3 rounded-lg bg-content2/50'>
                <IoTimeOutline className='text-2xl text-primary' />
                <div>
                  <p className='font-semibold text-sm'>Fast Delivery</p>
                  <p className='text-xs text-default-500'>2-3 business days</p>
                </div>
              </div>
              <div className='flex items-center gap-3 p-3 rounded-lg bg-content2/50'>
                <IoCheckmarkCircle className='text-2xl text-primary' />
                <div>
                  <p className='font-semibold text-sm'>Authentic</p>
                  <p className='text-xs text-default-500'>100% Genuine</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className='flex flex-col sm:flex-row gap-4 mt-auto pt-6 border-t border-divider'>
              {isLoggedIn ? (
                <>
                  <Button
                    color='primary'
                    size='lg'
                    className='flex-1 font-semibold text-lg'
                    startContent={<IoCartOutline className='text-2xl' />}
                    onPress={handleAddToCart}
                    isLoading={isAddingToCart}
                    isDisabled={isAddingToCart}>
                    {isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
                  </Button>
                  <Button
                    variant='bordered'
                    size='lg'
                    isIconOnly
                    className='min-w-[3.5rem] border-default-200 hover:border-danger hover:text-danger'>
                    <IoHeartOutline size={24} />
                  </Button>
                </>
              ) : (
                <div className='w-full p-4 bg-warning-50 border border-warning-200 rounded-lg flex items-center justify-between'>
                  <span className='text-warning-700 font-medium'>
                    Login to purchase this item
                  </span>
                  <Button
                    size='sm'
                    variant='flat'
                    color='warning'
                    onPress={() => router.push('/login')}>
                    Login Now
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className='mb-16'>
          <div className='flex border-b border-divider mb-6'>
            <button
              className={`px-6 py-3 font-medium text-lg transition-colors relative ${
                activeTab === 'description'
                  ? 'text-primary'
                  : 'text-default-500 hover:text-foreground'
              }`}
              onClick={() => setActiveTab('description')}>
              Description
              {activeTab === 'description' && (
                <div className='absolute bottom-0 left-0 w-full h-0.5 bg-primary' />
              )}
            </button>
            <button
              className={`px-6 py-3 font-medium text-lg transition-colors relative ${
                activeTab === 'reviews'
                  ? 'text-primary'
                  : 'text-default-500 hover:text-foreground'
              }`}
              onClick={() => setActiveTab('reviews')}>
              Reviews (12)
              {activeTab === 'reviews' && (
                <div className='absolute bottom-0 left-0 w-full h-0.5 bg-primary' />
              )}
            </button>
          </div>

          <div className='min-h-[200px]'>
            {activeTab === 'description' ? (
              <div className='prose prose-invert max-w-none'>
                <p className='text-default-500 leading-relaxed'>
                  {product.description}
                </p>
                <p className='text-default-500 leading-relaxed mt-4'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            ) : (
              <div className='space-y-6'>
                {[1, 2].map(review => (
                  <div
                    key={review}
                    className='border-b border-divider pb-6 last:border-0'>
                    <div className='flex items-center gap-2 mb-2'>
                      <div className='flex text-yellow-400 text-sm'>
                        <IoStar />
                        <IoStar />
                        <IoStar />
                        <IoStar />
                        <IoStar />
                      </div>
                      <span className='font-semibold'>Great Product!</span>
                    </div>
                    <p className='text-default-500 mb-2'>
                      Exactly what I was looking for. The quality is amazing and
                      shipping was super fast.
                    </p>
                    <p className='text-xs text-default-400'>
                      Posted by John Doe on Nov 15, 2023
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className='text-2xl font-bold mb-6'>Related Products</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {relatedProducts.map(relatedProduct => (
                <ProductCard
                  key={relatedProduct._id}
                  product={relatedProduct}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
