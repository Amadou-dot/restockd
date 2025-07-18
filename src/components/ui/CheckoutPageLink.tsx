import { Button } from '@heroui/button';
import Link from 'next/link';
export default function CheckoutPageLink() {
  return (
    <Button
      as={Link}
      className='flex-1 '
      color='primary'
      id='checkout-button'
      radius='sm'
      size='lg'
      href='/checkout'
      type='button'>
      Checkout
    </Button>
  );
}
