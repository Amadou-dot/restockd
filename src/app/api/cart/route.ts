import { initializeDatabase } from '@/lib/mongoose';
import { User } from '@/models/user';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await initializeDatabase();

    const cart = await User.getPopulatedCart();
    const response = {
      cart,
    };

    return NextResponse.json({
      message: 'Cart retrieved successfully',
      data: response,
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
