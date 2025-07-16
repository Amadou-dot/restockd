'use client'
import { prefetchProducts } from '@/lib/queryHelpers';
import { useQueryClient } from '@tanstack/react-query';

export default function Home() {
  const queryClient = useQueryClient();
  prefetchProducts(queryClient);
  return <div className='h-screen'>Home</div>;
}
