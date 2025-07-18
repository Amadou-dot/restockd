import { useAddToCart } from '@/hooks/useAddToCart';
import { addToast } from '@heroui/toast';
import { IoCartOutline } from 'react-icons/io5';

export default function AddToCartButton({ productId }: { productId: string }) {
  const { mutate: addToCart, isPending } = useAddToCart();
  const handleAddToCart = () => {
    // Logic to add product to cart
    if (isPending) return; // Prevent multiple clicks while pending
    
    addToCart(productId, {
      onSuccess: () => {
        console.log('Add to cart success - showing toast'); // Debug log
        addToast({
          title: 'Item added to cart',
          description: 'The item has been successfully added to your cart.',
          color: 'success',
        });
      },
      onError: (error) => {
        console.error(`Error adding product ${productId} to cart:`, error);
        addToast({
          title: 'Failed to add to cart',
          description: 'There was an error adding the item to your cart. Please try again.',
          color: 'danger',
        });
      },
    });
  };
  return <IoCartOutline size={24} onClick={handleAddToCart} />;
}
