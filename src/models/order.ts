import mongoose from 'mongoose';
import { IOrderDocument, OrderDetails, OrderItem } from '../types/Order';

const Schema = mongoose.Schema;

const orderSchema = new Schema<IOrderDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  items: [
    {
      productName: {
        type: String,
        required: true,
      },
      productPrice: {
        type: Number,
        required: true,
      },
      image_url: {
        type: String,
        required: true,
      },
      product: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      dateAdded: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  invoiceUrl: {
    type: String,
    required: false, // Optional field for invoice URL
  },
});

orderSchema.index({ userId: 1, createdAt: -1 }); // Index for faster queries by userId and creation date

orderSchema.methods.getOrderSummary = function () {
  return {
    totalItems: this.items.reduce(
      (sum: number, item: OrderItem) => sum + item.quantity,
      0
    ),
    totalPrice: this.totalPrice,
    status: this.status,
    createdAt: this.createdAt,
  };
};

orderSchema.methods.getOrderDetails = async function (): Promise<OrderDetails> {
  return {
    userId: this.userId,
    items: this.items,
    totalPrice: this.totalPrice,
    status: this.status,
    createdAt: this.createdAt,
    invoiceUrl: this.invoiceUrl,
  };
};

export const Order =
  mongoose.models.Order || mongoose.model<IOrderDocument>('Order', orderSchema);
