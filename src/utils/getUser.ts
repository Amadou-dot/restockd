import { User } from '@/models/user';
import type { IUserDocument } from '@/types/User';
import { currentUser } from '@clerk/nextjs/server';

export const getUser = async (): Promise<IUserDocument | null> => {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return null;
  }

  try {
    // Try to find user by clerkId
    let user = (await User.findOne({ clerkId: clerkUser.id })) as IUserDocument;

    if (user) {
      return user;
    }

    // If not found by clerkId, try to find by email (migration path)
    const email = clerkUser.emailAddresses[0]?.emailAddress;
    if (email) {
      user = (await User.findOne({ email })) as IUserDocument;
      if (user) {
        // Link existing user to Clerk
        user.clerkId = clerkUser.id;
        await user.save();
        return user;
      }
    }

    // If user doesn't exist, create a new one
    const firstName = clerkUser.firstName || 'User';
    const lastName = clerkUser.lastName || 'Name';

    // Create new user
    user = await User.create({
      clerkId: clerkUser.id,
      email: email,
      firstName,
      lastName,
      password: 'clerk-auth-placeholder', // Placeholder as auth is handled by Clerk
    });

    return user;
  } catch (error) {
    console.error('Error fetching/creating user:', error);
    return null;
  }
};
