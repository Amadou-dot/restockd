'use client';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/dropdown';
import { User } from '@heroui/user';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function UserAvatar() {
  const { data: session } = useSession();
  const user = session?.user;
  const [imageError, setImageError] = useState(false);

  // Reset image error when user changes
  useEffect(() => {
    setImageError(false);
  }, [user?.image]);

  const userName = user?.name || 'Guest';
  const userEmail = user?.email || 'guest@example.com';

  // Use fallback if there's an error or no image
  const fallbackImage = `https://i.pravatar.cc/150?u=${encodeURIComponent(
    userEmail
  )}`;

  let userImage = fallbackImage;
  if (!imageError && user?.image) {
    // Use proxy for Google images to avoid CORS issues
    if (user.image.includes('googleusercontent.com')) {
      userImage = `/api/proxy-image?url=${encodeURIComponent(user.image)}`;
    } else {
      userImage = user.image;
    }
  }
  const disabledKeys = ['wishlist', 'seller', 'support', 'addresses', 'payment', 'account'];

  return (
    <Dropdown placement='bottom-end'>
      <DropdownTrigger>
        <User
          avatarProps={{
            src: userImage,
            alt: userName,
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
          onPress={() => signOut({ callbackUrl: '/' })}>
          🚪 Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
