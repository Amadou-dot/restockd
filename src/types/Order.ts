import { ObjectId } from 'mongoose';

export interface OrderItem {
  productName: string;
  productPrice: number;
  image_url: string;
  productId: string;
  quantity: number;
  dateAdded: string;
  _id: string;
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

export interface OrdersResponse {
  success: boolean;
  orders: Order[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalOrders: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
