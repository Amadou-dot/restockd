'use client';
import { useCart } from '@/hooks/useCart';
import { Spinner } from '@heroui/spinner';
import Alert from '../../components/Alert';
import CartItemCard from '../../components/CartItemCard';
import CheckoutPageLink from '../../components/ui/CheckoutPageLink';
import ClearCartBtn from '../../components/ui/ClearCartBtn';
import type { PopulatedCartItem } from '../../types/Cart';

const CartList = ({
  cartItems,
  canModify,
}: {
  cartItems: PopulatedCartItem[];
  canModify?: boolean;
}) => {
  return (
    <div className='space-y-3'>
      {cartItems.map(item => (
        <CartItemCard
          key={item.product._id.toString()}
          canModify={canModify}
          item={item}
        />
      ))}
    </div>
  );
};

export default function Cart() {
  const { data: cart, isLoading, error } = useCart();

  return (
    <>
      <title>Cart</title>
      <meta content='Manage your shopping cart' name='description' />
      {isLoading && !error && <Spinner title='Loading cart...' />}
      {error && <Alert description={error.message} title='Error' />}
      {!isLoading && cart && cart.items && (
        <div className='max-w-5xl mx-auto p-6'>
          {cart.items.length === 0 ? (
            <div className='text-center'>
              <Alert color='primary' description='Your cart is empty.' />
            </div>
          ) : (
            <div>
              <div className='mb-6 flex items-center justify-between'>
                <h2 className='text-2xl font-bold '>Shopping Cart</h2>
                <div className='text-right'>
                  <p className='text-sm'>Subtotal</p>
                  <p className='text-2xl font-bold '>
                    ${cart.totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
              <CartList cartItems={cart.items} />
              <div className='mt-8 p-6 rounded-lg'>
                <div className='flex gap-3'>
                  <ClearCartBtn />
                  <CheckoutPageLink />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
