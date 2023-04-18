import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import TwitterProvider from 'next-auth/providers/twitter';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { compare } from 'bcrypt';

import { prisma } from 'lib/prisma';
import { generateAvatarUrl } from 'lib/avatar';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        if (!user.password) {
          // User registered with OAuth and doesn't have a password
          throw new Error('Please sign in using your OAuth provider.');
          // Alternatively, prompt the user to set a password for their account
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        console.log('Is Password Valid:', isPasswordValid);

        if (!isPasswordValid) {
          throw new Error('Invalid email or password');
        }

        return {
          id: String(user.id),
          email: user.email,
          name: user.name,
          image: user.image, // Add the `image` property here
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID!,
      clientSecret: process.env.TWITTER_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      console.log('Session Callback', { session, token });

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    async jwt({ token, user, account, profile }) {
      console.log('JWT Callback:', {
        token,
        user,
        account,
        profile,
      });

      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
    async signIn({ user, account, profile }) {
      console.log('signIn Callback:', { user, account, profile });

      if (!account) {
        return false;
      }

      const email = user.email;

      if (!email) {
        return false;
      }

      let dbUser = await prisma.user.findUnique({ where: { email } });

      console.log('Database User:', dbUser);

      if (!dbUser) {
        const userData: {
          email: string;
          name: string | null | undefined;
          image?: string;
        } = {
          email,
          name: user.name,
        };

        if (user?.name) {
          const avatarUrl = generateAvatarUrl(user.name);
          userData.image = avatarUrl;
        }

        dbUser = await prisma.user.create({
          data: userData,
        });

        console.log('Created New User:', dbUser);
      }

      user.id = String(dbUser.id);

      console.log('Sign In Successful:', user);
      return true;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
