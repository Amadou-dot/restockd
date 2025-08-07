import { Product } from '@/models/product';
import { uploadImageToS3Bucket } from '@/utils/AWSBucket';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const priceRaw = formData.get('price');
    const description = formData.get('description');
    const image = formData.get('image');
    const userId = formData.get('userId');

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json(
        { error: 'Product name is required' },
        { status: 400 }
      );
    }
    if (
      !priceRaw ||
      typeof priceRaw !== 'string' ||
      isNaN(parseFloat(priceRaw))
    ) {
      return NextResponse.json(
        { error: 'Product price is required and must be a number' },
        { status: 400 }
      );
    }
    const price = parseFloat(priceRaw);
    if (
      !description ||
      typeof description !== 'string' ||
      description.trim() === ''
    ) {
      return NextResponse.json(
        { error: 'Product description is required' },
        { status: 400 }
      );
    }
    if (!image || !(image instanceof File)) {
      return NextResponse.json(
        { error: 'Product image is required and must be a file' },
        { status: 400 }
      );
    }
    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const imageUrl = await uploadImageToS3Bucket(image);

    const newProduct = new Product({
      name,
      price,
      description,
      image: imageUrl,
      userId,
    });

    await newProduct.save();

    return NextResponse.json(
      {
        message: 'Product created successfully',
        data: newProduct,
      },
      { status: 201 }
    );
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
