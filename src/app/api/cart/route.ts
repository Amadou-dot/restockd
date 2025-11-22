import { initializeDatabase } from '@/lib/mongoose';
import { getUser } from '@/utils/getUser';
import type { PopulatedCart } from '@/types/Cart';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await initializeDatabase();
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

    const cart: PopulatedCart = await user.getCart();

    return NextResponse.json({
      message: 'Cart retrieved successfully',
      data: cart,
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      {
        message: 'Error fetching cart',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
