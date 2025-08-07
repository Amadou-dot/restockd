import { initializeDatabase } from '@/lib/mongoose';
import { Product } from '@/models/product';
import type { Product as ProductType } from '@/types/Product';
import { uploadImageToS3Bucket } from '@/utils/AWSBucket';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

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
      const imageURL = await uploadImageToS3Bucket(image);
      updateData.image = imageURL;
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
