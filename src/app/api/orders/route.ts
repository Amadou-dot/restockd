import { getUser } from '@/utils/getUser';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json(
        { message: 'User not found', error: 'User not found' },
        { status: 404 }
      );
    }

    const orders = await user.getOrders();

    return NextResponse.json({
      message: 'Orders retrieved successfully',
      data: orders,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      {
        message: 'Error fetching orders',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
