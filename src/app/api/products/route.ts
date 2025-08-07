import type { ProductsResponse } from '@/types/Product';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { initializeDatabase } from '../../../lib/mongoose';
import { Product } from '../../../models/product';
import { PRODUCTS_PER_PAGE } from '../../../utils/constants';

export async function GET(request: NextRequest) {
  try {
    await initializeDatabase();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');

    const totalProducts = await Product.countDocuments({});
    const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

    const products = await Product.find({})
      .skip(page > 0 ? (page - 1) * PRODUCTS_PER_PAGE : 0)
      .limit(PRODUCTS_PER_PAGE)
      .sort({ createdAt: -1, _id: -1 });

    const response: ProductsResponse = {
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
