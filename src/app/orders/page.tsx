'use client';
import ErrorMessage from '@/components/ErrorMessage';
import OrderCard from '@/components/OrderCard';
import { useOrders } from '@/hooks/useOrders';
import { Alert } from '@heroui/alert';
import { Spinner } from '@heroui/spinner';

export default function Orders() {
  const { data: orders, isPending, error } = useOrders();

  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      {isPending && <Spinner className='mt-4' />}
      {error && <ErrorMessage description={error.message} />}
      {orders && orders.length === 0 && (
        <Alert color='primary' description='No orders found.' />
      )}
      {!isPending &&
        orders &&
        orders.map(order => (
          <OrderCard key={order._id.toString()} order={order} />
        ))}
    </div>
  );
}
