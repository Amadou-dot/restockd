import { ICartDocument, PopulatedCart } from '@/types/Cart';
import type { Product as IProduct } from '@/types/Product';
import mongoose from 'mongoose';
import { Product } from './product';

const Schema = mongoose.Schema;
const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
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
  totalQuantity: { type: Number, default: 0 },
  totalPrice: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
});

cartSchema.methods.getCart = async function (): Promise<PopulatedCart> {
  await this.populate('items.product');
  return this as PopulatedCart;
};

cartSchema.methods.addToCart = async function (
  this: ICartDocument,
  product: IProduct,
  quantity = 1
) {
  if (quantity <= 0) {
    throw new Error('Quantity must be greater than 0');
  }

  const itemIndex = this.items.findIndex(
    item => item.product.toString() === product._id.toString()
  );

  if (itemIndex > -1) {
    // Item already exists in the cart, update quantity
    this.items[itemIndex].quantity += quantity;
  } else {
    // Item does not exist, add new item
    if (!product) throw new Error('Product not found');

    this.items.push({
      product: product._id,
      quantity,
      dateAdded: new Date(),
    });
  }

  this.totalQuantity += quantity;
  this.totalPrice += product.price * quantity;
  this.lastUpdated = new Date();

  await this.save();
};

cartSchema.methods.deleteItemFromCart = async function (
  this: ICartDocument,
  productId: string
) {
  const itemIndex = this.items.findIndex(
    item => item.product.toString() === productId.toString()
  );

  if (itemIndex === -1) throw new Error('Item not found in cart'); // Item not found in cart

  const productPrice = await Product.findById(productId).select('price');

  // if quantity is greater than 1, just reduce the quantity
  if (this.items[itemIndex].quantity > 1) this.items[itemIndex].quantity -= 1;
  // if quantity is 1, remove the item from the cart
  else this.items.splice(itemIndex, 1);

  this.totalQuantity -= 1;
  this.totalPrice -= productPrice ? productPrice.price : 0;
  this.lastUpdated = new Date();

  await this.save();
};

cartSchema.methods.clearCart = async function (this: ICartDocument) {
  this.items = [];
  this.totalQuantity = 0;
  this.totalPrice = 0;
  this.lastUpdated = new Date();

  await this.save();
};

export const Cart =
  mongoose.models.Cart || mongoose.model<ICartDocument>('Cart', cartSchema);
