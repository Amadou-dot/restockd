import type { Document } from 'mongoose';
import type { PopulatedCart } from './Cart';
import type { Order } from './Order';
import type { Product } from './Product';

export interface User {
  firstName: string;
  lastName: string;
  password: string; // Hashed password
  email: string;
  clerkId?: string;
  resetToken?: string;
  resetTokenExpiration?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  confirmPassword: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  isLoggedIn: boolean;
}

export interface IUserDocument extends User, Document {
  /**
   * Adds a product to the user's cart.
   * @param {IProduct} product - The product to add to the cart.
   * @param {number} [quantity=1] - The quantity of the product to add. Defaults to 1.
   * @return {Promise<void>} A promise that resolves when the product is added.
   * @throws {Error} If the quantity is less than or equal to 0.
   */
  addToCart(product: Product, quantity?: number): Promise<void>;
  /**
   * Deletes an item from the user's cart.
   * @param {string} productId - The ID of the product to remove from the cart.
   * @return {Promise<void>} A promise that resolves when the item is removed.
   */
  deleteItemFromCart(productId: string): Promise<void>;
  /**
   * Clears the user's cart.
   * @return {Promise<void>} A promise that resolves when the cart is cleared.
   */
  clearCart(): Promise<void>;

  /**
   * Retrieves the user's cart with populated product details.
   * @return {Promise<PopulatedCart>} A promise that resolves to the populated cart.
   * @throws {Error} If there are issues retrieving the populated cart.
   */
  getCart(): Promise<PopulatedCart>;
  /**
   * Places an order based on the current user's cart.
   * @return {Promise<void>} A promise that resolves when the order is placed.
   * @throws {Error} If the cart is empty or there are issues placing the order.
   */
  placeOrder(): Promise<void>;
  /**
   * Retrieves all orders placed by the user.
   * @return {Promise<Order[]>} A promise that resolves to an array of orders.
   * @throws {Error} If there are issues retrieving the orders.
   */
  getOrders(): Promise<Order[]>;

  /**
   * Retrieves all products created by the user.
   * @return {Promise<ProductsResponse>} A promise that resolves to products with pagination info.
   * @throws {Error} If there are issues retrieving the products.
   */
  getCreatedProducts(page: number): Promise<{
    products: Product[];
    totalPages: number;
    totalProducts: number;
    currentPage: number;
  }>;

  /**
   * Retrieves the count of products created by the user.
   * @return {Promise<number>} A promise that resolves to the total count of created products.
   * @throws {Error} If there are issues retrieving the count.
   */
  getCreatedProductsCount(): Promise<number>;
}
