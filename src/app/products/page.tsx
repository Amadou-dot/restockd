'use client';
import ProductList from '@/components/ProductList';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function ProductsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setSearchParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);

      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const currentPage = parseInt(searchParams.get('page') || '1');

  const handlePageChange = (page: number) => {
    setSearchParam('page', page.toString());
  };
  return (
    <div>
      <ProductList page={currentPage} onPageChange={handlePageChange} />
    </div>
  );
}
