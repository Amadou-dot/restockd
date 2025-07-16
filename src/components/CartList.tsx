import type { PopulatedCartItem } from '../types/Cart';
import CartItemCard from './CartItemCard';

export const CartList = ({
  cartItems,
  canModify,
}: {
  cartItems: PopulatedCartItem[];
  canModify?: boolean;
}) => {
  return (
    <div className='space-y-3'>
      {cartItems.map(item => (
        <CartItemCard
          key={item.productId.toString()}
          canModify={canModify}
          item={item}
        />
      ))}
    </div>
  );
};
