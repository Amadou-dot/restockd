import { SignIn } from '@clerk/nextjs';

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  return (
    <div className='flex justify-center items-center min-h-[60vh]'>
      <SignIn routing='hash' />
    </div>
  );
}
