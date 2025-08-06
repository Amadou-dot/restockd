import { initializeDatabase } from '@/lib/mongoose';
import { OrderItem } from '@/types/Order';
import { getUser } from '@/utils/getUser';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    await initializeDatabase();
    
    const body = await request.json();
    const { sessionId } = body;

    // Verify the session ID is provided
    if (!sessionId) {
      return NextResponse.json(
        { message: 'Session ID required', error: 'Session ID is required to complete order' },
        { status: 400 }
      );
    }

    // Verify the Stripe session was actually paid
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { message: 'Payment not completed', error: 'Payment must be completed before creating order' },
        { status: 400 }
      );
    }
    
    const user = await getUser();
    if (!user) {
      return NextResponse.json(
        { message: 'User not found', error: 'User not found' },
        { status: 404 }
      );
    }

    // Verify the session customer email matches the user
    if (session.customer_email !== user.email) {
      return NextResponse.json(
        { message: 'Session mismatch', error: 'Session does not belong to current user' },
        { status: 403 }
      );
    }

    // Get user's cart
    const cart = await user.getCart();
    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        { message: 'Cart is empty', error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Create order from cart
    const Order = (await import('@/models/order')).Order;

    const orderItems: OrderItem[] = cart.items.map((item) => ({
      productName: item.product.name,
      productPrice: item.product.price,
      image_url: String(item.product.image),
      product: item.product._id,
      quantity: item.quantity,
      dateAdded: item.dateAdded,
    }));

    const order = new Order({
      userId: user._id,
      items: orderItems,
      status: 'completed', // Mark as completed since payment was successful
      createdAt: new Date(),
      totalPrice: cart.totalPrice,
    });

    await order.save();

    // Clear the cart after creating the order
    await user.clearCart();

    return NextResponse.json({
      message: 'Order created successfully',
      data: {
        orderId: order._id,
        totalPrice: order.totalPrice,
        itemCount: order.items.length
      }
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      {
        message: 'Error creating order',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
