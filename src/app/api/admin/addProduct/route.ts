import { Product } from '@/models/product';
import { uploadImageToS3Bucket } from '@/utils/AWSBucket';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    console.log('Form data received:', formData);
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
