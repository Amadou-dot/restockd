import { User } from '@/models/user';
import type { IUserDocument } from '@/types/User';
import { getServerSession } from 'next-auth';
import { authOptions } from './authOptions';

export const getUser = async (): Promise<IUserDocument | null> => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return null;
  }

  try {
    const user = (await User.findById(userId)) as IUserDocument;
    if (!user) {
      console.error(`User with ID ${userId} not found`);
      return null;
    }
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};
