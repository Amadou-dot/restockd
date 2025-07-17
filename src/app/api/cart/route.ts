import { initializeDatabase } from '@/lib/mongoose';
import { User } from '@/models/user';
import { PopulatedCart } from '@/types/Cart';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await initializeDatabase();
    const user = await User.findById('6865e7611f740a3fd8c1ecb6');

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
