import { ButtonGroup } from '@heroui/button';
import type { Product } from '../types/Product';
import ProductCard from './ProductCard';
import DeleteProductBtn from './ui/DeleteProductBtn';
import EditProductBtn from './ui/EditProductBtn';

export default function AdminProductCard({ product }: { product: Product }) {
  const adminActions = (
    <ButtonGroup>
      <EditProductBtn product={product} />
      <DeleteProductBtn product={product} />
    </ButtonGroup>
  );

  return (
    <ProductCard
      adminActions={adminActions}
      product={product}
      variant='admin'
    />
  );
}
