import { User } from '@/models/user';
import { IUserDocument } from '@/types/User';
import { NextRequest } from 'next/server';

export const getUser = async (
  req: NextRequest
): Promise<IUserDocument | null> => {
  const userId = req.headers.get('user-id') || '6865e7611f740a3fd8c1ecb6';
  if (!userId) {
    console.error('User ID not found in request headers');
    return null;
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      console.error(`User with ID ${userId} not found`);
      return null;
    }
    return user as IUserDocument;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};
