'use client';
import { useProducts } from '@/hooks/useProducts';
import { Button } from '@heroui/button';
import { Spinner } from '@heroui/spinner';
import Link from 'next/link';
import ProductCard from './ProductCard';

export default function FeaturedProducts() {
  const { data, isPending, error } = useProducts(1);
  const products = data?.products?.slice(0, 4) || [];

  if (error) return null;

  return (
    <section className='py-12'>
      <div className='flex justify-between items-center mb-8 px-4'>
        <h2 className='text-3xl font-bold'>Featured Products</h2>
        <Button
          as={Link}
          href='/products'
          variant='light'
          color='primary'
          className='font-semibold'>
          View All
        </Button>
      </div>

      {isPending ? (
        <div className='flex justify-center py-12'>
          <Spinner size='lg' label='Loading featured products...' />
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4'>
          {products.map(product => (
            <div key={product._id.toString()} className='flex justify-center'>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
