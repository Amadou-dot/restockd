import { SignUp } from '@clerk/nextjs';

export const dynamic = 'force-dynamic';

export default function SignupPage() {
  return (
    <div className='flex justify-center items-center min-h-[60vh]'>
      <SignUp routing='hash' />
    </div>
  );
}
