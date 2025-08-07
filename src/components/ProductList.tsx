import { prefetchProducts } from '@/lib/queryHelpers';
import { Pagination } from '@heroui/pagination';
import { useQueryClient } from '@tanstack/react-query';
import { useProducts } from '../hooks/useProducts';
import ErrorMessage from './ErrorMessage';
import LoadingCards from './LoadingCards';
import Message from './Message';
import ProductCard from './ProductCard';

export default function ProductList({
  page,
  onPageChange,
}: {
  page: number;
  onPageChange?: (page: number) => void;
}) {
  const { data: productsData, isPending, error } = useProducts(page);
  // Prefetch next page when current page changes
  const queryClient = useQueryClient();

  const products = productsData?.products || [];
  const totalPages = productsData?.totalPages || 0;
  prefetchProducts(queryClient, page < totalPages ? page + 1 : page);

  if (page > totalPages && totalPages > 0) {
    // If the current page is greater than total pages, reset to last page
    if (onPageChange) {
      onPageChange(totalPages);
    }
  }

  if (error)
    return (
      <div className='w-full max-w-7xl mx-auto px-4'>
        <div className='flex flex-wrap gap-4 sm:gap-6 md:gap-12 justify-center'>
          <ErrorMessage description={error.message} />
        </div>
      </div>
    );

  if (isPending && !error) {
    return (
      <div className='w-full max-w-7xl mx-auto px-4'>
        <div className='flex flex-wrap gap-4 sm:gap-6 md:gap-12 justify-center'>
          <LoadingCards />
        </div>
      </div>
    );
  }

  if (!isPending && !error && products.length === 0) {
    return (
      <div className='w-full max-w-7xl mx-auto px-4'>
        <div className='flex flex-wrap gap-4 sm:gap-6 md:gap-12 justify-center'>
          <Message title='No Products Found' />
        </div>
      </div>
    );
  }

  if (!isPending && !error && products && products.length > 0) {
    return (
      <div className='w-full max-w-7xl px-4 flex flex-col'>
        <div className='flex flex-wrap gap-4 sm:gap-6 md:gap-12 justify-center sm:justify-start mb-8 sm:mb-10'>
          {products.map(product => (
            <ProductCard key={product._id.toString()} product={product} />
          ))}
        </div>
        {!isPending && !error && totalPages > 1 && (
          <div className='flex justify-center items-center w-full mt-4'>
            <Pagination
              showControls
              className='flex justify-center'
              isDisabled={isPending}
              page={page}
              total={totalPages}
              onChange={onPageChange ? onPageChange : undefined}
            />
          </div>
        )}
      </div>
    );
  }
  // Fallback in case no conditions are met
  return (
    <div className='w-full max-w-7xl mx-auto px-4'>
      <div className='flex flex-wrap gap-4 sm:gap-6 md:gap-12 justify-center'>
        <Message title='No Products Found' />
      </div>
    </div>
  );
}
