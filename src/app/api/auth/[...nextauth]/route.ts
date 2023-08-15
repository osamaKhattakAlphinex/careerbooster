import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt", // 'jwt' OR 'database'
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {}, // empty because we don't need the UI
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        await startDB();
        const user = await User.findOne({ email });
        if (!user) throw Error("Invalid Email / Password");

        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) throw Error("Invalid Email / Password");

        return {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          id: user._id,
        };
      },
    }),
  ],
  callbacks: {
    jwt(params: any) {
      if (params.user?.role) {
        params.token.role = params.user.role;
        // params.token.firstName = params.user.firstName;
        // params.token.lastName = params.user.lastName;
        params.token.id = params.user.id;
      }
      // return final token
      return params.token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as { id: string }).id = token.id as string;
        (session.user as { role: string }).role = token.role as string;
        // (session.user as { firstName: string }).firstName =
        //   token.firstName as string;
        // (session.user as { lastName: string }).lastName =
        //   token.lastName as string;
      }
      return session;
    },
  },
};

const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST };
