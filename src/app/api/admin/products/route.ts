import { NextRequest, NextResponse } from 'next/server';
import { initializeDatabase } from '../../../../lib/mongoose';
import { Product } from '../../../../models/product';
import { PRODUCTS_PER_PAGE } from '../../../../utils/constants';

// GET /api/admin/products - Get all products (admin view)
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
      .sort({ createdAt: -1 });

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

// POST /api/admin/products - Create new product (admin only)
export async function POST(request: NextRequest) {
  try {
    await initializeDatabase();

    const formData = await request.formData();
    const name = formData.get('name') as string;
    const price = parseFloat(formData.get('price') as string);
    const description = formData.get('description') as string;
    const image = formData.get('image') as File;
    const userId = formData.get('userId') as string;

    if (!name || !price || !description || !image || !userId) {
      return NextResponse.json(
        {
          message: 'All fields are required',
          error: 'All fields are required',
        },
        { status: 400 }
      );
    }

    // TODO: Handle file upload to S3 or your storage service
    // For now, we'll just use the filename
    const imagePath = image.name;

    const newProduct = new Product({
      name,
      price,
      description,
      image: imagePath,
      userId,
    });

    await newProduct.save();

    return NextResponse.json({
      message: 'Product created successfully',
      data: newProduct,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      {
        message: 'Error creating product',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
