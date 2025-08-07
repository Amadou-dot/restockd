import { initializeDatabase } from '@/lib/mongoose';
import type { PopulatedCartItem } from '@/types/Cart';
import { getUser } from '@/utils/getUser';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
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

    const user = await getUser();
    if (!user) {
      return NextResponse.json(
        {
          message: 'User not found',
          error: 'User not found',
        },
        { status: 404 }
      );
    }

    const cart = await user.getCart();
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
