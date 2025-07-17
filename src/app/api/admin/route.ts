import { PRODUCTS_PER_PAGE } from '@/utils/constants';
import { getUser } from '@/utils/getUser';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const user = await getUser(request);

    if (!user) {
      return NextResponse.json(
        {
          message: 'User not found',
        },
        { status: 404 }
      );
    }

    const totalProducts = await user.getCreatedProductsCount();
    const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

    const products = await user.getCreatedProducts(page);

    const response = {
      products,
      totalPages: totalPages > 0 ? totalPages : 0,
      totalProducts,
      currentPage: page,
    };

    return NextResponse.json({
      message: 'Products retrieved successfully',
      data: response,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      {
        message: 'Error fetching products',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
