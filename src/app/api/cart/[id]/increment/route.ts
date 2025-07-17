import { initializeDatabase } from '@/lib/mongoose';
import { PopulatedCartItem } from '@/types/Cart';
import { getUser } from '@/utils/getUser';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await initializeDatabase();
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          message: 'Cart item ID is required',
          error: 'Cart item ID is required',
        },
        { status: 400 }
      );
    }

    const user = await getUser(request);
    if (!user) {
      return NextResponse.json(
        {
          message: 'User not found',
          error: 'User not found',
        },
        { status: 404 }
      );
    }

    const cart = await user.getPopulatedCart();
    const item = cart.items.find(
      (item: PopulatedCartItem) => item.product._id.toString() === id
    );

    if (!item) {
      return NextResponse.json(
        {
          message: 'Cart item not found',
          error: 'Cart item not found',
        },
        { status: 404 }
      );
    }

    // Use addToCart with the product and quantity of 1 to increment
    await user.addToCart(item.product, 1);

    // Get the updated cart to return the latest data
    const updatedCart = await user.getPopulatedCart();
    const updatedItem = updatedCart.items.find(
      (cartItem: PopulatedCartItem) => cartItem.product._id.toString() === id
    );

    return NextResponse.json({
      message: 'Cart item incremented successfully',
      data: updatedItem,
    });
  } catch (error) {
    console.error('Error incrementing cart item:', error);
    return NextResponse.json(
      {
        message: 'Error incrementing cart item',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
