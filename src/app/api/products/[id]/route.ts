import { NextRequest, NextResponse } from 'next/server';
import { initializeDatabase } from '../../../../lib/mongoose';
import { Product } from '../../../../models/product';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await initializeDatabase();

    const productId = params.id;

    if (!productId) {
      return NextResponse.json(
        {
          message: 'Product ID is required',
          error: 'Product ID is required',
        },
        { status: 400 }
      );
    }

    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json(
        {
          message: 'Product not found',
          error: 'Product not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Product retrieved successfully',
      data: product,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      {
        message: 'Error fetching product',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
