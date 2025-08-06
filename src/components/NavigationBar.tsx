'use client';
import { Button } from '@heroui/button';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@heroui/navbar';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import UserAvatar from './UserAvatar';

export const CompanyLogo = () => {
  return (
    <svg fill='none' height='36' viewBox='0 0 32 32' width='36'>
      <path
        clipRule='evenodd'
        d='M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z'
        fill='currentColor'
        fillRule='evenodd'
      />
    </svg>
  );
};

export default function NavigationBar() {
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const isLoading = status === 'loading';
  const isLoggedIn = status === 'authenticated' && !!session;

  // Base menu items always shown
  const baseMenuItems = [
    { title: 'Shop', to: '/' },
    { title: 'Products', to: '/products' },
  ];

  // Protected menu items only shown when logged in
  const protectedMenuItems = [
    { title: 'Add Product', to: '/admin/add-product' },
    { title: 'Admin Products', to: '/admin/products' },
    { title: 'Cart', to: '/cart' },
  ];

  // Combine menu items based on login status
  const menuItems = isLoggedIn
    ? [...baseMenuItems, ...protectedMenuItems]
    : baseMenuItems;

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isBordered
      classNames={{
        item: [
          'flex',
          'relative',
          'h-full',
          'items-center',
          "data-[active=true]:after:content-['']",
          'data-[active=true]:after:absolute',
          'data-[active=true]:after:bottom-0',
          'data-[active=true]:after:left-0',
          'data-[active=true]:after:right-0',
          'data-[active=true]:after:h-[2px]',
          'data-[active=true]:after:rounded-[2px]',
          'data-[active=true]:after:bg-primary',
        ],
      }}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
        <NavbarBrand>
          <CompanyLogo />
          <p className='font-bold text-inherit select-none'>Restock&apos;d</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        {menuItems.map(({ title, to }) => (
          <NavbarItem key={to} isActive={path === to}>
            <Link
              className='w-full'
              href={to}
              color='foreground'
              onClick={() => setIsMenuOpen(false)}>
              {title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify='end'>
        {isLoading ? (
          <NavbarItem>
            <span className='text-sm text-gray-500'>Loading...</span>
          </NavbarItem>
        ) : isLoggedIn ? (
          <UserAvatar />
        ) : (
          <NavbarItem key={'login'}>
            <Button
              as={Link}
              className='w-full'
              color='primary'
              href='/login'
              variant='ghost'
              onPress={() => setIsMenuOpen(false)}>
              Sign In
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      {/* Mobile menu */}
      <NavbarMenu>
        {menuItems.map(({ title, to }, index) => (
          <NavbarMenuItem key={`${to}-${index}`} isActive={path === to}>
            <Link
              onClick={() => setIsMenuOpen(false)}
              className='w-full'
              href={to}
              color={
                index === 2
                  ? 'primary'
                  : index === menuItems.length - 1
                  ? 'danger'
                  : 'foreground'
              }>
              {title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
