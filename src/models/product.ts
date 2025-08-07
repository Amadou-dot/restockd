import { APP_CONFIG } from '@/config/app';
import mongoose from 'mongoose';
import type { ProductInput } from '../types/Product';

const Schema = mongoose.Schema;

const productSchema = new Schema<ProductInput>({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    minlength: [1, 'Product name cannot be empty'],
    maxlength: [
      APP_CONFIG.product.nameMaxLength,
      `Product name cannot exceed ${APP_CONFIG.product.nameMaxLength} characters`,
    ],
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
    minlength: [1, 'Product description cannot be empty'],
    maxlength: [
      APP_CONFIG.product.descriptionMaxLength,
      `Product description cannot exceed ${APP_CONFIG.product.descriptionMaxLength} characters`,
    ],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [APP_CONFIG.product.priceMin, 'Price must be a positive number'],
    max: [
      APP_CONFIG.product.priceMax,
      `Price cannot exceed ${APP_CONFIG.product.priceMax.toLocaleString()}`,
    ],
  },
  image: {
    type: String, // S3 key for image
    required: [true, 'Image is required'],
  },
  userId: {
    type: String,
    required: [true, 'User ID is required'],
  },
});

export const Product =
  mongoose.models.Product ||
  mongoose.model<ProductInput>('Product', productSchema);
