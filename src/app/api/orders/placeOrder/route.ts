// This route handles placing orders for the authenticated user

import { getUser } from '@/utils/getUser';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: Request) {
  try {
    // Check environment variables
    if (!process.env.STRIPE_SECRET_KEY || !process.env.CLIENT_URL) {
      console.error('Missing environment variables:', {
        STRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY,
        CLIENT_URL: !!process.env.CLIENT_URL
      });
      return NextResponse.json(
        { 
          message: 'Payment system configuration error',
          error: 'STRIPE_SECRET_KEY and CLIENT_URL environment variables are required'
        },
        { status: 500 }
      );
    }
    
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const user = await getUser();
    if (!user)
      return NextResponse.json(
        { message: 'User not found', error: 'User not found' },
        { status: 404 }
      );

    const items = (await user.getCart()).items;
    if (items.length === 0)
      return NextResponse.json(
        { message: 'Cart is empty', error: 'Cart is empty' },
        { status: 400 }
      );

    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,

      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.product.name,
          },
          unit_amount: Math.round(item.product.price * 100), // Stripe expects amount in cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    return NextResponse.json({
      message: 'Order placed successfully',
      id: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    return NextResponse.json(
      {
        message: 'Error creating Stripe session',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
