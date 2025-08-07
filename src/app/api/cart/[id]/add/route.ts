import { Product } from '@/models/product';
import { getUser } from '@/utils/getUser';
import type { NextRequest as NxtReq } from 'next/server';
import { NextResponse } from 'next/server';

// api/cart/[id]/add
export async function POST(
  req: NxtReq,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
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

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        {
          message: 'Product not found',
          error: 'Product not found',
        },
        { status: 404 }
      );
    }

    await user.addToCart(product);
    const cart = await user.getCart();
    if (!cart) {
      return NextResponse.json(
        {
          message: 'Cart not found',
          error: 'Cart not found',
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: 'Item added to cart successfully',
        data: cart,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
