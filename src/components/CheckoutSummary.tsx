import { PopulatedCartItem } from '@/types/Cart';
import { Button } from '@heroui/button';
import { Card, CardBody, CardHeader } from '@heroui/card';
import Link from 'next/link';
import PlaceOrderBtn from './ui/PlaceOrderBtn';

export default function CheckoutSummary({
  cartItems,
  totalPrice,
}: {
  cartItems: PopulatedCartItem[];
  totalPrice: number;
}) {
  const subtotal = totalPrice;
  const shipping: number = 0; // Free shipping for now
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <Card className='h-fit sticky top-4'>
      <CardHeader>
        <h3 className='text-xl font-semibold'>Order Summary</h3>
      </CardHeader>
      <CardBody className='space-y-4'>
        <div className='space-y-2'>
          <div className='flex justify-between'>
            <span>Subtotal ({cartItems.length} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className='flex justify-between'>
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className='flex justify-between'>
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        </div>

        <div className='border-t border-gray-600 my-4'></div>

        <div className='flex justify-between text-lg font-semibold'>
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <div className='space-y-3 mt-6'>
          <PlaceOrderBtn />
          <div className='text-xs text-gray-400 text-center space-y-1'>
            <p>🔒 Secure checkout powered by Stripe</p>
            <p>Free shipping on all orders</p>
          </div>
          <div className='text-center'>
            <Button
              as={Link}
              href='/cart'
              variant='solid'
              className='text-sm text-gray-400 hover:text-gray-200'>
              ← Continue Shopping
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
