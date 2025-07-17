import { PRODUCTS_PER_PAGE } from '@/utils/constants';
import ProductSkeleton from './ProductSkeleton';

export default function LoadingCards() {
  return Array.from({ length: PRODUCTS_PER_PAGE }).map((_, index) => (
    <ProductSkeleton key={index} />
  ));
}
