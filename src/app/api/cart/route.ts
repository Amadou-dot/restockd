import { initializeDatabase } from '@/lib/mongoose';
import { PopulatedCart } from '@/types/Cart';
import { getUser } from '@/utils/getUser';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await initializeDatabase();
    const user = await getUser(req);

    if (!user) {
      return NextResponse.json(
        {
          message: 'User not found',
          error: 'User not found',
        },
        { status: 404 }
      );
    }

    const cart: PopulatedCart = await user.getPopulatedCart();

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
