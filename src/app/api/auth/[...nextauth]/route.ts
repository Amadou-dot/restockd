import { IUserDocument } from '@/types/User';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { MongoClient } from 'mongodb';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

const client = new MongoClient(process.env.MONGODB_URI!);
const clientPromise = client.connect();

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],

  callbacks: {
    async session({ session, user }) {
      if (user && session.user) {
        (session.user as IUserDocument).id = user.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };

