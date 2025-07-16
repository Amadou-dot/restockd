import { Pagination } from '@heroui/pagination';
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

  const products = productsData?.products || [];
  const totalPages = productsData?.totalPages || 0;

  if (page > totalPages && totalPages > 0) {
    // If the current page is greater than total pages, reset to last page
    if (onPageChange) {
      onPageChange(totalPages);
    }
  }
  return (
    <div className='flex flex-wrap gap-12'>
      {!isPending && !error && products && products.length > 0 ? (
        products.map(product => (
          <ProductCard key={product._id.toString()} product={product} />
        ))
      ) : (
        <>
          {isPending && <LoadingCards />}
          {error && <ErrorMessage description={(error as Error).message} />}

          {!isPending && products.length === 0 && !error && (
            <Message title='No Products Found' />
          )}
        </>
      )}
      {!isPending && !error && totalPages > 1 && (
        <Pagination
          showControls
          className='w-full self-center'
          isDisabled={isPending}
          page={page}
          total={totalPages}
          onChange={onPageChange ? onPageChange : undefined}
        />
      )}
    </div>
  );
}
