import { initializeDatabase } from '@/lib/mongoose';
import { User } from '@/models/user';
import { PopulatedCartItem } from '@/types/Cart';
import { IUserDocument } from '@/types/User';
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

    const user = (await User.findById(
      '6865e7611f740a3fd8c1ecb6'
    )) as IUserDocument;
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

    await user.deleteItemFromCart(id);

    return NextResponse.json({
      message: 'Cart item decremented successfully',
      data: item,
    });
  } catch (error) {
    console.error('Error decrementing cart item:', error);
    return NextResponse.json(
      {
        message: 'Error decrementing cart item',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
