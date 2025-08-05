import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { User } from '@/models/user';
import { IUserDocument } from '@/types/User';
import { getServerSession } from 'next-auth';

export const getUser = async (): Promise<IUserDocument | null> => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    console.error('User ID not found in session');
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
