'use client';
import AdminProductCard from '@/components/AdminProductCard';
import ErrorMessage from '@/components/ErrorMessage';
import LoadingCards from '@/components/LoadingCards';
import Message from '@/components/Message';
import { useAdminProducts } from '@/hooks/useAdminProducts';
import { Pagination } from '@heroui/pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function AdminProductPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setSearchParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);

      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const currentPage = parseInt(searchParams.get('page') || '1');

  const {
    data: productsData,
    isPending,
    error,
  } = useAdminProducts(currentPage);

  const products = productsData?.products || [];
  const totalPages = productsData?.totalPages || 0;

  // If the current page is greater than total pages, reset to last page
  if (currentPage > totalPages && totalPages > 0) {
    setSearchParams('page', totalPages.toString());
  }

  const handlePageChange = (page: number) => {
    setSearchParams('page', page.toString());
  };

  return (
    <>
      <title>Admin Products</title>
      <meta content='Manage your products' name='description' />
      <div className='flex flex-wrap gap-8'>
        {isPending && <LoadingCards />}
        {!isPending &&
          !error &&
          products &&
          products.length > 0 &&
          products.map(product => (
            <AdminProductCard key={product._id.toString()} product={product} />
          ))}

        {!isPending && !error && products.length === 0 && (
          <Message
            description='You have not added any products yet.'
            // title='No Products Found'
          />
        )}

        {!isPending && error && <ErrorMessage description={error.message} />}
      </div>
      {!isPending && !error && totalPages > 1 && (
        <Pagination
          showControls
          className='w-full self-center'
          isDisabled={isPending}
          page={currentPage}
          total={totalPages}
          onChange={handlePageChange}
        />
      )}
    </>
  );
}
