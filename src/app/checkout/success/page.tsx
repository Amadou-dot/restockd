'use client';
import { useCompleteOrder } from '@/hooks/useOrders';
import { Button } from '@heroui/button';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { addToast } from '@heroui/toast';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { FaCheckCircle, FaShoppingBag } from 'react-icons/fa';

export const dynamic = 'force-dynamic';

function CheckoutSuccessContent() {
  const [orderCompleted, setOrderCompleted] = useState(false);
  const { mutate: completeOrder, data: orderDetails } = useCompleteOrder();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Complete the order when the page loads, but only if we have a session ID
    if (!orderCompleted && sessionId) {
      completeOrder(sessionId, {
        onSuccess: data => {
          setOrderCompleted(true);
          addToast({
            title: 'Order Confirmed',
            description: `Your order with ${data.itemCount} items has been saved.`,
            color: 'success',
          });
        },
        onError: error => {
          console.error('Error completing order:', error);
          addToast({
            title: 'Order Processing Error',
            description:
              'There was an issue verifying your payment. Please contact support.',
            color: 'danger',
          });
          setOrderCompleted(true);
        },
      });
    } else if (!sessionId) {
      // No session ID means they accessed this page directly
      addToast({
        title: 'Invalid Access',
        description:
          'Please complete your purchase through the checkout process.',
        color: 'warning',
      });
    }
  }, [orderCompleted, sessionId, completeOrder]);

  return (
    <div className='min-h-[60vh] flex items-center justify-center p-6'>
      <div className='max-w-md w-full'>
        {!sessionId ? (
          // Show warning if no session ID (direct access)
          <Card className='text-center'>
            <CardHeader className='flex flex-col items-center pb-2'>
              <div className='mb-4'>
                <FaCheckCircle className='text-yellow-500 text-6xl mx-auto' />
              </div>
              <h1 className='text-2xl font-bold text-yellow-500'>
                Invalid Access
              </h1>
            </CardHeader>

            <CardBody className='space-y-6'>
              <div className='space-y-2'>
                <p className='text-gray-300'>
                  Please complete your purchase through the checkout process.
                </p>
              </div>

              <div className='space-y-3'>
                <Button
                  as={Link}
                  href='/cart'
                  color='primary'
                  className='w-full'
                  startContent={<FaShoppingBag />}>
                  Go to Cart
                </Button>

                <Button
                  as={Link}
                  href='/products'
                  color='secondary'
                  variant='bordered'
                  className='w-full'>
                  Continue Shopping
                </Button>
              </div>
            </CardBody>
          </Card>
        ) : (
          // Show success if we have a session ID
          <Card className='text-center'>
            <CardHeader className='flex flex-col items-center pb-2'>
              <div className='mb-4'>
                <FaCheckCircle className='text-green-500 text-6xl mx-auto' />
              </div>
              <h1 className='text-2xl font-bold text-green-500'>
                Order Successful!
              </h1>
            </CardHeader>

            <CardBody className='space-y-6'>
              <div className='space-y-2'>
                <p className='text-gray-300'>
                  Thank you for your purchase! Your order has been placed
                  successfully.
                </p>
                {orderDetails && (
                  <div className='text-sm text-gray-400 space-y-1'>
                    <p>Order ID: {orderDetails.orderId}</p>
                    <p>Items: {orderDetails.itemCount}</p>
                    <p>Total: ${orderDetails.totalPrice.toFixed(2)}</p>
                    {orderDetails.invoiceUrl && (
                      <p>
                        <a
                          href={orderDetails.invoiceUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-blue-400 hover:text-blue-300 underline'>
                          Download Invoice (PDF)
                        </a>
                      </p>
                    )}
                  </div>
                )}
                <p className='text-sm text-gray-400'>
                  You will receive an email confirmation shortly with your order
                  details.
                </p>
              </div>

              <div className='space-y-3'>
                <Button
                  as={Link}
                  href='/orders'
                  color='primary'
                  className='w-full'
                  startContent={<FaShoppingBag />}>
                  View My Orders
                </Button>

                <Button
                  as={Link}
                  href='/products'
                  variant='bordered'
                  className='w-full'>
                  Continue Shopping
                </Button>
              </div>

              <div className='text-xs text-gray-400 border-t border-gray-600 pt-4'>
                <p>Need help? Contact our support team.</p>
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <>
      <title>Order Successful | Restock-D</title>
      <meta
        content='Your order has been placed successfully'
        name='description'
      />
      <Suspense fallback={<div>Loading...</div>}>
        <CheckoutSuccessContent />
      </Suspense>
    </>
  );
}
