import mongoose, { ObjectId } from 'mongoose';
import { Product } from './Product';

export interface OrderItem {
  productName: string;
  productPrice: number;
  image_url: string;
  quantity: number;
  dateCreated?: Date; // Optional, defaults to current date
  product: string; // Product ID as string
}

export interface PopulatedOrderItem extends Omit<OrderItem, 'product'> {
  product: Product; // Populated product details
}

export interface OrderInput {
  userId: ObjectId; // User ID as ObjectId
  items: OrderItem[];
  status?: 'pending' | 'completed' | 'cancelled';
}

// Order interface for client
export interface Order extends OrderInput {
  createdAt: Date;
  totalPrice: number;
  invoiceUrl?: string; // Optional invoice URL
}

// Order interface for MongoDB documents
export interface OrderDocument extends OrderInput {
  _id: string;
  createdAt: Date;
  totalPrice: number;
  invoiceUrl?: string; // Optional invoice URL
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CreateOrderRequest {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  shippingAddress: ShippingAddress;
}

export interface OrderResponse {
  success: boolean;
  order: Order;
  message?: string;
}

export interface OrderDetails {
  userId: ObjectId;
  items: PopulatedOrderItem[];
  totalPrice: number;
  status: string;
  createdAt: Date;
  invoiceUrl?: string; // Optional invoice URL
}

export interface IOrderDocument extends Order, Document {
  /**
   * Get a summary of the order.
   * @returns An object containing the total items, total price, status, and created at date.
   */
  getOrderSummary: () => {
    totalItems: number;
    totalPrice: number;
    status: string;
    createdAt: Date;
  };
  /**
   * Get detailed information about the order.
   * @returns An object containing userId, items, totalPrice, status, createdAt date, and optional invoice URL.
   */
  getOrderDetails: () => {
    userId: mongoose.Types.ObjectId;
    items: OrderItem[];
    totalPrice: number;
    status: string;
    createdAt: Date;
    invoiceUrl?: string;
  };
}
