import { User } from "@prisma/client";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/hooks/libs/prismadb";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "email", type: "password" },
      },
      async authorize(credentials): Promise<User> {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isPassword = bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ session, token, user, trigger }) {
      token.picture = "";
      if (trigger === "update" && session) {
        token.username = session.username;
        token.name = session.name;
        token.bio = session.bio;
      }

      if (trigger !== "update" && user && (user as User)) {
        return {
          ...token,
          username: (user as User).username,
          name: (user as User).name,
          bio: (user as User).bio,
          createdAt: (user as User).createdAt,
          userId: (user as User).id,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user.createdAt = token.createdAt as Date;
      session.user.userId = token.userId as string;
      session.user.username = token.username as string;
      session.user.bio = token.bio as string;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV !== "production",
};

export default options;
