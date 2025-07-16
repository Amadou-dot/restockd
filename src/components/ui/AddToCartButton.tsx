import { IoCartOutline } from 'react-icons/io5';
export default function AddToCartButton({ productId }: { productId: string }) {
  const handleAddToCart = () => {
    // Logic to add product to cart
    console.log(`Adding product ${productId} to cart`);
  }
  return <IoCartOutline size={24} onClick={handleAddToCart} />;
}
