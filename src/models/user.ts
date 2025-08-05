import { Product } from '@/models/product';
import type { ICartDocument as ICart, PopulatedCart } from '@/types/Cart';
import type { Product as IProduct } from '@/types/Product';
import type { IUserDocument } from '@/types/User';
import { PRODUCTS_PER_PAGE } from '@/utils/constants';
import mongoose from 'mongoose';
import { Cart } from './cart';

const Schema = mongoose.Schema;

const userSchema = new Schema<IUserDocument>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minlength: [2, 'First name must be at least 2 characters long'],
    maxlength: [50, 'First name cannot exceed 50 characters'],
    validate: {
      validator: function (v: string) {
        return /^[a-zA-Z\s]+$/.test(v);
      },
      message: 'First name must contain only letters and spaces',
    },
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    minlength: [2, 'Last name must be at least 2 characters long'],
    maxlength: [50, 'Last name cannot exceed 50 characters'],
    validate: {
      validator: function (v: string) {
        return /^[a-zA-Z\s]+$/.test(v);
      },
      message: 'Last name must contain only letters and spaces',
    },
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    unique: true,
    lowercase: true, // Normalize to lowercase
    validate: {
      validator: function (v: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Invalid email address format',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false, // Do not return password in queries by default
  },
  resetToken: {
    type: String,
    select: false, // Do not return resetToken in queries by default,
  },
  resetTokenExpiration: {
    type: Date,
    select: false, // Do not return resetTokenExpiration in queries by default
  },
});

userSchema.methods.getCart = async function (
  this: IUserDocument
): Promise<PopulatedCart | null> {
  const cart = (await Cart.findOne({ userId: this._id })) as ICart;
  if (!cart) return null;
  return await cart.getCart();
};

userSchema.methods.addToCart = async function (
  this: IUserDocument,
  product: IProduct,
  quantity = 1
) {
  let cart = await Cart.findOne({ userId: this._id });

  // If the cart doesn't exist, create it
  if (!cart) {
    cart = await Cart.create({
      userId: this._id,
      items: [],
      totalQuantity: 0,
      totalPrice: 0,
      lastUpdated: new Date(),
    });
  }

  // Delegate to the cart's addToCart method
  await cart.addToCart(product, quantity);
};

userSchema.methods.deleteItemFromCart = async function (
  this: IUserDocument,
  productId: string
) {
  const cart = await Cart.findOne({ userId: this._id });

  if (!cart) {
    throw new Error('Cart not found');
  }

  await cart.deleteItemFromCart(productId);
};

userSchema.methods.clearCart = async function (this: IUserDocument) {
  const cart = await Cart.findOne({ userId: this._id });

  if (!cart) {
    throw new Error('Cart not found');
  }

  await cart.clearCart();
};

// userSchema.methods.placeOrder = async function (this: IUserDocument) {
//   if (!this.cart || this.cart.items.length === 0)
//     throw new Error(`Cart is empty`);

//   // Validate cart totals
//   if (this.cart.totalQuantity <= 0 || this.cart.totalPrice <= 0)
//     throw new Error(`Cart totals are invalid`);

//   // Get populated cart items
//   const cartItems = await this.getCart();
//   const orderItems: OrderItem[] = cartItems.items.map(
//     (item: PopulatedCart['items'][number]) => ({
//       productName: item.product.name,
//       productPrice: item.product.price,
//       image_url: String(item.product.image), // Image is an S3 URL string
//       productId: item.productId,
//       quantity: item.quantity,
//       dateAdded: item.dateAdded,
//     })
//   );

//   // Create a new order document
//   const order = new Order({
//     userId: this._id,
//     items: orderItems,
//     status: 'pending',
//     createdAt: new Date(),
//     totalPrice: this.cart.totalPrice,
//   });

//   // Save the order
//   await order.save();

//   // Clear the cart after placing order
//   await this.clearCart();

//   await this.save();
// };

// userSchema.methods.getOrders = async function (this: IUserDocument) {
//   // Get orders from the Order collection for this user
//   const orders: OrderType[] = await Order.find({ userId: this._id }).exec();
//   return orders;
// };

userSchema.methods.getCreatedProducts = async function (
  this: IUserDocument,
  page: number = 1
) {
  // Get total count of products created by this user
  const totalProducts = await Product.find({
    userId: this._id,
  }).countDocuments();
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  // Get products created by this user for the current page
  const products = await Product.find({ userId: this._id })
    .skip(page > 0 ? (page - 1) * PRODUCTS_PER_PAGE : 0)
    .limit(PRODUCTS_PER_PAGE)
    .sort({ createdAt: -1, _id: -1 });

  return {
    products,
    totalPages: totalPages > 0 ? totalPages : 0,
    totalProducts,
    currentPage: page,
  };
};

userSchema.methods.getCreatedProductsCount = async function (
  this: IUserDocument
) {
  // Get total count of products created by this user
  return await Product.find({ userId: this._id }).countDocuments();
};

export const User =
  mongoose.models.User || mongoose.model<IUserDocument>('User', userSchema);
