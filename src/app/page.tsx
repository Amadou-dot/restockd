'use client';
import { prefetchProducts } from '@/lib/queryHelpers';
import { useQueryClient } from '@tanstack/react-query';

export default function Home() {
  const queryClient = useQueryClient();
  prefetchProducts(queryClient);
  return (
    <div className='h-screen gap-5 flex flex-col'>
      <p className='text-center'>Best selling products (coming soon)</p>
      <p className='text-center'>Latest products (coming soon)</p>
    </div>
  );
}
