import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const sig = request.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;

        // Get the customer email from the session
        const customerEmail = session.customer_email;

        if (customerEmail) {
          // Find user by email and create order
          // This is a simplified approach - in production you'd want to store
          // user ID in the session metadata for better reliability
          await createOrderFromSession(session, customerEmail);
        }

        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function createOrderFromSession(
  session: Stripe.Checkout.Session,
  customerEmail: string
) {
  try {
    // This is a simplified implementation
    // In a real app, you'd store user ID in session metadata
    console.log(
      'Creating order for session:',
      session.id,
      'customer:',
      customerEmail
    );

    // For now, we'll handle order creation on the success page
    // since we need the user to be authenticated to access their cart
  } catch (error) {
    console.error('Error creating order from session:', error);
  }
}
