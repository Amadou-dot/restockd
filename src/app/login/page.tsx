'use client';
import SignUpPageLink from '@/components/ui/SignUpPageLink';
import { handleGithubSignIn, handleGoogleSignIn } from '@/lib/signInHandlers';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { FaApple, FaGithub, FaGoogle } from 'react-icons/fa6';

export default function LoginPage() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const formData = new FormData(e.currentTarget);
    // const dataObj = Object.fromEntries(formData.entries());
  };

  return (
    <>
      <title>Login</title>
      <meta content='Login to your account' name='description' />
      <Form onSubmit={handleSubmit} className='max-w-lg mx-auto '>
        <Input
          isRequired
          autoComplete='email'
          errorMessage='Please enter a valid email address'
          label='Email Address'
          labelPlacement='outside'
          name='email'
          radius='sm'
          type='email'
          variant='bordered'
        />
        <Input
          isRequired
          autoComplete='current-password'
          label='Password'
          labelPlacement='outside'
          name='password'
          radius='sm'
          type='password'
          variant='bordered'
        />
        <Button
          fullWidth
          className='mt-4'
          color='primary'
          radius='sm'
          type='submit'>
          Login
        </Button>

        <div className='relative my-6'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300'></div>
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='px-2 bg-background text-gray-500'>
              Or continue with
            </span>
          </div>
        </div>

        <div className='flex justify-between gap-4 w-full'>
          <Button
            fullWidth
            variant='light'
            radius='sm'
            isIconOnly
            startContent={<FaGithub size={40} />}
            onPress={handleGithubSignIn}
          />

          <Button
            fullWidth
            variant='light'
            radius='sm'
            isIconOnly
            startContent={<FaGoogle size={40} />}
            onPress={handleGoogleSignIn}
          />
          <Button
            fullWidth
            variant='light'
            radius='sm'
            isIconOnly
            startContent={<FaApple size={40} />}
            // onPress={handleAppleSignIn}
          />
        </div>

        <SignUpPageLink />
      </Form>
    </>
  );
}
