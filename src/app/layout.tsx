import { ClerkProvider } from '@clerk/nextjs';
import ErrorBoundary from '@/components/ErrorBoundary';
import NavigationBar from '@/components/NavigationBar';
import QueryProvider from '@/components/QueryProvider';
import { ToastProvider } from '@heroui/toast';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  preload: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  preload: true,
});

export const metadata: Metadata = {
  title: {
    template: "%s | Restock'd",
    default: "Restock'd",
  },
  description: 'A modern e-commerce platform for all your restocking needs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en' className='dark'>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ErrorBoundary>
            <QueryProvider>
              <ToastProvider placement='bottom-center' />
              <NavigationBar />
              <main className='p-8 min-h-screen'>{children}</main>
            </QueryProvider>
          </ErrorBoundary>
        </body>
      </html>
    </ClerkProvider>
  );
}
