import Otp from "@/db/schemas/Otp";
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
      credentials: {}, // empty because we Don{"'"}t need the UI
      async authorize(credentials, req) {
        const { email, otp } = credentials as {
          email: string;
          otp: number;
        };

        await startDB();
        const user = await User.findOne({ email });
        if (!user) throw Error("Invalid Email");
        if (!user.status) throw Error("User is not active");
        const otpRecords = await Otp.find({
          email,
          expiry: { $gt: Date.now() },
        });
        if (otpRecords.length > 1) {
          let otpMatched = false;
          for (const otpRecord of otpRecords) {
            const otpMatch = await otpRecord.compareOtp(otp);
            if (otpMatch) {
              if (Date.now() > otpRecord.expiry) {
                await Otp.deleteOne({ email, expiry: otpRecord.expiry});
                throw Error("Otp is expired");
              }
              otpMatched = true;
              break; // Exit loop if OTP matched
            }
          }
          if (!otpMatched) {
            
            throw Error("Invalid Otp")
          }
          await Otp.deleteMany({ email});
        } else {
          if (Date.now() > otpRecords[0].expiry) {
            await Otp.deleteOne({ email });
            throw Error("Otp is expired");
          }
          const otpMatch = await otpRecords[0].compareOtp(otp);

          if (!otpMatch) {
            throw Error("Invalid Otp");
          } else {
            await Otp.deleteOne({ email });
          }
        }
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
