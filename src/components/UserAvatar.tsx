'use client';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/dropdown';
import { User } from '@heroui/user';
import { useClerk, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function UserAvatar() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [imageError, setImageError] = useState(false);

  // Reset image error when user changes
  useEffect(() => {
    setImageError(false);
  }, [user?.imageUrl]);

  const userName = user?.fullName || 'Guest';
  const userEmail =
    user?.primaryEmailAddress?.emailAddress || 'guest@example.com';

  // Use fallback if there's an error or no image
  const fallbackImage = `https://i.pravatar.cc/150?u=${encodeURIComponent(
    userEmail
  )}`;

  let userImage = fallbackImage;
  if (!imageError && user?.imageUrl) {
    userImage = user.imageUrl;
  }
  const disabledKeys = [
    'wishlist',
    'seller',
    'support',
    'addresses',
    'payment',
    'account',
  ];

  return (
    <Dropdown placement='bottom-end'>
      <DropdownTrigger>
        <User
          avatarProps={{
            src: userImage,
            alt: userName || 'User',
            isBordered: true,
            size: 'sm',
            color: 'secondary',
            showFallback: true,
          }}
          name={userName}
          as='button'
          className='transition-transform'
          onError={() => setImageError(true)}
        />
      </DropdownTrigger>
      <DropdownMenu
        disabledKeys={disabledKeys}
        aria-label='Profile Actions'
        variant='flat'>
        <DropdownItem key='profile' className='h-14 gap-2' textValue='Profile'>
          <p className='font-semibold'>Signed in as</p>
          <p className='font-semibold'>{userEmail}</p>
        </DropdownItem>

        <DropdownItem key='orders' textValue='My Orders'>
          <Link href='/orders'>📦 My Orders</Link>
        </DropdownItem>

        <DropdownItem key='wishlist' textValue='Wishlist'>
          <Link href='/wishlist'>❤️ Wishlist</Link>
        </DropdownItem>

        <DropdownItem key='account' textValue='Account Settings'>
          <Link href='/account'>⚙️ Account Settings</Link>
        </DropdownItem>

        <DropdownItem key='addresses' textValue='Shipping Addresses'>
          <Link href='/account/addresses'>📍 Shipping Addresses</Link>
        </DropdownItem>

        <DropdownItem key='payment' textValue='Payment Methods'>
          <Link href='/account/payment'>💳 Payment Methods</Link>
        </DropdownItem>

        <DropdownItem key='seller' textValue='Seller Dashboard'>
          <Link href='/seller/dashboard'>🏪 Seller Dashboard</Link>
        </DropdownItem>

        <DropdownItem key='support' textValue='Help & Support'>
          <Link href='/support'>🎧 Help & Support</Link>
        </DropdownItem>

        <DropdownItem
          key='logout'
          color='danger'
          className='text-danger'
          textValue='Log Out'
          onPress={() => signOut({ redirectUrl: '/' })}>
          🚪 Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
