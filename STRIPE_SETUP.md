# Stripe Integration Setup

This guide explains how to set up Stripe for the checkout functionality.

## Required Environment Variables

Add these to your `.env.local` file:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...  # Your Stripe secret key
CLIENT_URL=http://localhost:3000  # Your app's URL (for redirects)
```

## Getting Your Stripe Keys

1. **Create a Stripe Account**
   - Go to [stripe.com](https://stripe.com)
   - Sign up or log in to your account

2. **Get Your API Keys**
   - Go to [Stripe Dashboard](https://dashboard.stripe.com)
   - Navigate to "Developers" → "API keys"
   - Copy your "Secret key" (starts with `sk_test_` for test mode)

3. **Test Mode vs Live Mode**
   - Use `sk_test_...` keys for development
   - Use `sk_live_...` keys for production
   - The checkout flow works the same in both modes

## How the Integration Works

1. **User clicks "Place Order & Pay"**
   - The `usePlaceOrder` hook calls `/api/orders/placeOrder`

2. **Server creates Stripe Checkout Session**
   - API route validates user and cart
   - Creates a Stripe checkout session with cart items
   - Returns the checkout URL

3. **User is redirected to Stripe**
   - Secure payment processing on Stripe's servers
   - User enters payment details safely

4. **After Payment**
   - Success: User returns to `/checkout/success`
   - Cancel: User returns to `/cart`

## Testing the Integration

1. **Test Card Numbers**
   ```
   Successful payment: 4242 4242 4242 4242
   Declined payment: 4000 0000 0000 0002
   ```

2. **Test Details**
   - Any future expiry date (e.g., 12/34)
   - Any 3-digit CVC (e.g., 123)
   - Any ZIP code (e.g., 12345)

## File Structure

- `src/hooks/useOrders.ts` - React hook for placing orders
- `src/app/api/orders/placeOrder/route.ts` - API endpoint
- `src/components/ui/PlaceOrderBtn.tsx` - UI component
- `src/lib/api.ts` - API client function

## Security Notes

- Never expose `STRIPE_SECRET_KEY` in client-side code
- Always validate data on the server side
- Stripe handles all payment processing securely
- No credit card data touches your servers
