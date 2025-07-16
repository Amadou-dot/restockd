import Link from 'next/link';

export default function ResetPageLink() {
  return (
    <p className='text-sm text-gray-500 mt-2'>
      Forgot your password?{' '}
      <Link className='text-blue-600 hover:underline' href='/password-reset'>
        Reset here
      </Link>
    </p>
  );
}
