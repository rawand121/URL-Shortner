import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Users from "../../../Server/models/User";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import connectDatabase from "../../../Server/config/config";

connectDatabase();

export default NextAuth({
  session: {
    jwt: true,
    secret: process.env.JWT_SECRET,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error("Please enter a Email and Password");
        }
        const user = await Users.findOne({ email }).select("+password");

        if (!user) {
          throw new Error("User Not Found");
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
          throw new Error("Email or password mismatch");
        }
        return Promise.resolve(user);
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      user && (token.user = user);
      return Promise.resolve(token);
    },

    async session({ session, user, token }) {
      session.user = token.user;
      return Promise.resolve(session);
    },
  },
});
