import { initializeDatabase } from '@/lib/mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { Product } from '../../../../models/product';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    initializeDatabase();
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          message: 'Product ID is required',
          error: 'Product ID is required',
        },
        { status: 400 }
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
