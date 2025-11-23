'use client';

import { Card, CardFooter, CardHeader } from '@heroui/card';
import { Image } from '@heroui/image';
import { useRouter } from 'next/navigation';
import { IoHeartOutline } from 'react-icons/io5';
import type { Product } from '../types/Product';
import AddToCartButton from './ui/AddToCartButton';

interface ProductCardProps {
  product: Product;
  variant?: 'customer' | 'admin';
  adminActions?: React.ReactNode;
  onCardClick?: () => void;
}

export default function ProductCard({
  product,
  variant = 'customer',
  adminActions,
  onCardClick,
}: ProductCardProps) {
  const router = useRouter();
  const { data: authData } = {
    data: { isLoggedIn: true },
  }; // Mocked auth data, replace with actual auth hook
  const isLoggedIn = authData?.isLoggedIn || false;

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick();
    } else if (variant === 'customer') {
      router.push(`/products/${product._id}`);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card click event
  };

  const isClickable = variant === 'customer' || !!onCardClick;

  return (
    <Card
      isFooterBlurred
      className='w-full h-[400px] col-span-12 sm:col-span-5 max-w-[300px] group transition-all duration-300 hover:-translate-y-2 overflow-hidden'
      isPressable={isClickable}
      onPress={isClickable ? handleCardClick : undefined}>
      <CardHeader className='absolute z-10 top-1 flex-col items-start'>
        {/* Optional: Add top-left content if needed, e.g. "New" badge */}
      </CardHeader>

      <Image
        removeWrapper
        alt={product.name}
        className='z-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
        src={product.image}
      />

      {/* Heart Icon - Top Right */}
      {variant === 'customer' && isLoggedIn && (
        <div
          className='absolute top-4 right-4 z-20 p-2 rounded-full bg-black/30 backdrop-blur-md'
          onClick={handleButtonClick}>
          <IoHeartOutline className='text-white' size={24} />
        </div>
      )}

      <CardFooter className='absolute bg-black/40 bottom-0 border-t-1 border-zinc-100/20 z-10 justify-between'>
        <div className='flex flex-col items-start'>
          <p className='text-white/90 text-lg font-bold'>{product.name}</p>
          <p className='text-white/80 text-tiny line-clamp-2 w-4/5'>
            {product.description}
          </p>
          <p className='text-white/90 font-bold text-xl mt-1'>
            ${product.price.toFixed(2)}
          </p>
        </div>

        {variant === 'customer' ? (
          <div onClick={handleButtonClick}>
            <AddToCartButton productId={product._id.toString()} />
          </div>
        ) : (
          variant === 'admin' &&
          adminActions && <div onClick={handleButtonClick}>{adminActions}</div>
        )}
      </CardFooter>
    </Card>
  );
}
