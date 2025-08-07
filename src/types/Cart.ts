import type mongoose from 'mongoose';
import type { Product } from './Product';

export interface CartItem {
  /** Product ID */
  product: string; // Product ID
  quantity: number;
  dateAdded: Date;
}

export interface PopulatedCartItem {
  product: Product;
  quantity: number;
  dateAdded: Date;
}

export type Cart = {
  userId: string;
  items: CartItem[];
  totalQuantity: number; // Total number of items in the cart
  totalPrice: number; // Total price of all items in the cart
  lastUpdated: Date;
  createdAt: Date;
  updatedAt: Date;
};

export interface PopulatedCart extends Omit<Cart, 'items'> {
  items: PopulatedCartItem[];
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  productId: string;
  quantity: number;
}

export interface CartResponse {
  success: boolean;
  cart: Cart;
  message?: string;
}

export interface ICartDocument extends Cart, mongoose.Document {
  getCart(): Promise<PopulatedCart>;
  addToCart(product: Product, quantity?: number): Promise<void>;
}
