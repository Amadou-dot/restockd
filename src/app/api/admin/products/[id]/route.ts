import { initializeDatabase } from '@/lib/mongoose';
import { Product } from '@/models/product';
import type { Product as ProductType } from '@/types/Product';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// GET /api/admin/products/[id] - Get single product (admin view)
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await initializeDatabase();

    const { id: productId } = await params;

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

// PUT /api/admin/products/[id] - Update product (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await initializeDatabase();

    const { id: productId } = await params;

    if (!productId) {
      return NextResponse.json(
        {
          message: 'Product ID is required',
          error: 'Product ID is required',
        },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const name = formData.get('name') as string;
    const price = parseFloat(formData.get('price') as string);
    const description = formData.get('description') as string;
    const image = formData.get('image') as File;

    const updateData: Partial<ProductType> = {
      name,
      price,
      description,
    };

    // Only update image if a new one is provided
    if (image && image.size > 0) {
      // TODO: Handle file upload to S3 or your storage service
      // For now, we'll just use the filename
      updateData.image = image.name;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return NextResponse.json(
        {
          message: 'Product not found',
          error: 'Product not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      {
        message: 'Error updating product',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/products/[id] - Delete product (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await initializeDatabase();

    const { id: productId } = await params;

    if (!productId) {
      return NextResponse.json(
        {
          message: 'Product ID is required',
          error: 'Product ID is required',
        },
        { status: 400 }
      );
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return NextResponse.json(
        {
          message: 'Product not found',
          error: 'Product not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Product deleted successfully',
      data: { id: productId },
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      {
        message: 'Error deleting product',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
