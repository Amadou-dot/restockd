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
      <div className='flex flex-wrap gap-12'>
        <ErrorMessage description={error.message} />
      </div>
    );

  if (isPending && !error) {
    return (
      <div className='flex flex-wrap gap-12'>
        <LoadingCards />
      </div>
    );
  }

  if (!isPending && !error && products.length === 0) {
    return (
      <div className='flex flex-wrap gap-12'>
        <Message title='No Products Found' />
      </div>
    );
  }

  if (!isPending && !error && products && products.length > 0) {
    return (
      <div className='w-screen'>
        <div className='flex flex-wrap gap-12 min-h-[650px] max-h-[650px] mb-10'>
          {products.map(product => (
            <ProductCard key={product._id.toString()} product={product} />
          ))}
        </div>
        {!isPending && !error && totalPages > 1 && (
          <div className='flex justify-center items-center w-full'>
            <Pagination
              showControls
              className='w-full self-center'
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
    <>
      <div className='flex flex-wrap gap-12'>
        <Message title='No Products Found' />
      </div>
    </>
  ); 
}
