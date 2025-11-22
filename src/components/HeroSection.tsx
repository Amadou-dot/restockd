import { Button } from '@heroui/button';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className='relative w-full h-[500px] flex items-center justify-center overflow-hidden rounded-2xl mb-12'>
      {/* Background Gradient */}
      <div className='absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-black to-gray-800'>
        <div className='absolute inset-0 bg-[url("/grid.svg")] opacity-20' />
        <div className='absolute inset-0 bg-gradient-to-t from-background to-transparent' />
      </div>

      {/* Content */}
      <div className='relative z-10 text-center px-4 max-w-4xl mx-auto'>
        <h1 className='text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary'>
          Welcome to Restock&apos;d
        </h1>
        <p className='text-xl md:text-2xl text-gray-300 mb-8'>
          Your one-stop destination for premium tech and lifestyle gear. Upgrade
          your setup today.
        </p>
        <div className='flex gap-4 justify-center'>
          <Button
            as={Link}
            href='/products'
            color='primary'
            size='lg'
            variant='shadow'
            className='font-semibold'>
            Shop Now
          </Button>
          <Button
            as={Link}
            href='/signup'
            color='secondary'
            size='lg'
            variant='bordered'
            className='font-semibold'>
            Join Us
          </Button>
        </div>
      </div>
    </div>
  );
}
