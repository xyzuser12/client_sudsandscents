import GoogleProvider from "next-auth/providers/google";
import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../lib/prismaClient";
import bcrypt from "bcryptjs";

const adapter = PrismaAdapter(prisma);

const authOptions = {
  adapter: adapter,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials;
        console.log(credentials);
        // await prisma.user.deleteMany();
        const user = await prisma.user.findUnique({
          where: { username },
        });

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        // const user = await prisma.user.
        // const user = {
        //   name: "Raymart Formalejo",
        //   email: "formalejoraymartbedia@gmail.com",
        //   image:
        //     "https://lh3.googleusercontent.com/a/AGNmyxZHbBRbsHoVAKrZ0yj3rDiY-Ku81T…",
        // };

        // const isValidationFailed = true
        // if(isValidationFailed) {
        //   throw new Error('Email password invalid')
        // }

        return user;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      return session;
    },
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.id;
        token.username = user.username;
        token.googleId = account.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

export const getServerAuthSession = (req, res) => {
  return getServerSession(req, res, authOptions);
};
