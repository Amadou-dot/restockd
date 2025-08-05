import { initializeDatabase } from '@/lib/mongoose';
import { User } from '@/models/user';
import { PopulatedCart } from '@/types/Cart';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { IUserDocument } from '@/types/User';

export async function GET() {
  try {
    await initializeDatabase();
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json(
        {
          message: 'User not found',
          error: 'User not found',
        },
        { status: 404 }
      );
    }
    const user = await User.findById(userId) as IUserDocument;

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
