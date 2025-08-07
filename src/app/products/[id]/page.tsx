'use client';

import ErrorMessage from '@/components/ErrorMessage';
import Message from '@/components/Message';
import ProductCard from '@/components/ProductCard';
import ProductSkeleton from '@/components/ProductSkeleton';
import { useProduct } from '@/hooks/useProduct';
import { useParams } from 'next/navigation';

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;

  const { data: product, isPending, error } = useProduct(productId);

  if (isPending) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <ProductSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className='container mx-auto px-4 py-8'>
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
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-2xl mx-auto'>
        <ProductCard product={product} />
      </div>
    </div>
  );
}
