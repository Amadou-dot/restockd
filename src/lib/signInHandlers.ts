import { signIn } from 'next-auth/react';

export const handleGithubSignIn = () => {
  signIn('github', { callbackUrl: '/' });
};

export const handleGoogleSignIn = () => {
  signIn('google', { callbackUrl: '/' });
};

export const handleAppleSignIn = () => {
  signIn('apple', { callbackUrl: '/' });
};

export const handleCredentialsSignIn = async (credentials: {
  email: string;
  password: string;
}) => {
  const result = await signIn('credentials', {
    redirect: false,
    email: credentials.email,
    password: credentials.password,
    callbackUrl: '/',
  });

  if (result?.error) {
    throw new Error(result.error);
  }

  return result;
};
