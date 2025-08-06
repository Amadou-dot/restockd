'use client';
import CheckoutSummary from '@/components/CheckoutSummary';
import { useCart } from '@/hooks/useCart';
import { Spinner } from '@heroui/spinner';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Alert from '../../components/Alert';
import CartItemCard from '../../components/CartItemCard';
import type { PopulatedCartItem } from '../../types/Cart';
import { Breadcrumbs, BreadcrumbItem } from '@heroui/breadcrumbs';
const CheckoutItemsList = ({
  cartItems,
}: {
  cartItems: PopulatedCartItem[];
}) => {
  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h3 className='text-xl font-semibold'>Review Your Items</h3>
        <span className='text-sm text-gray-400'>
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
        </span>
      </div>
      <div className='space-y-3'>
        {cartItems.map(item => (
          <CartItemCard
            key={item.product._id.toString()}
            canModify={false} // Disable modifications on checkout page
            item={item}
          />
        ))}
      </div>
    </div>
  );
};

export default function CheckoutPage() {
  const { data: cart, isLoading, error } = useCart();
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'loading') return; // Still loading
    if (!session) {
      router.push('/login?callbackUrl=/checkout');
      return;
    }
  }, [session, status, router]);

  // Redirect to cart if no items
  useEffect(() => {
    if (!isLoading && (!cart || !cart.items || cart.items.length === 0)) {
      router.push('/cart');
    }
  }, [cart, isLoading, router]);

  // Show loading while checking authentication
  if (status === 'loading') {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <Spinner size='lg' label='Loading...' />
      </div>
    );
  }

  // Don't render anything if redirecting
  if (!session) {
    return null;
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <Spinner size='lg' label='Loading checkout...' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='max-w-4xl mx-auto p-6'>
        <Alert
          title='Error Loading Checkout'
          description={error.message}
          color='danger'
        />
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className='max-w-4xl mx-auto p-6'>
        <Alert
          title='Your cart is empty'
          description='Add some items to your cart before checking out.'
          color='primary'
        />
      </div>
    );
  }

  return (
    <>
      <title>Checkout | Restock-D</title>
      <meta content='Review and place your order' name='description' />

      <div className='max-w-7xl mx-auto p-6'>
        {/* Breadcrumb */}
        <nav className='text-sm text-gray-400 mb-4'>
          <Breadcrumbs>
            <BreadcrumbItem href='/cart'>Cart</BreadcrumbItem>
            <BreadcrumbItem href='/checkout' isCurrent>
              Checkout
            </BreadcrumbItem>
            <BreadcrumbItem href='/payment' isDisabled>Payment</BreadcrumbItem>
          </Breadcrumbs>
        </nav>

        <div className='mb-8'>
          <h1 className='text-3xl font-bold mb-2'>Checkout</h1>
          <p className='text-gray-400'>
            Review your items and place your order
          </p>
        </div>

        <div className='grid lg:grid-cols-3 gap-8'>
          {/* Main content - Order items */}
          <div className='lg:col-span-2'>
            <CheckoutItemsList cartItems={cart.items} />
          </div>

          {/* Sidebar - Order summary */}
          <div className='lg:col-span-1'>
            <CheckoutSummary
              cartItems={cart.items}
              totalPrice={cart.totalPrice}
            />
          </div>
        </div>
      </div>
    </>
  );
}
