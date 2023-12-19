import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function postCoverLetter(payload: any) {
  await startDB();
  const user = await User.findOne({ email: payload.userEmail });
  if (!user) {
    return NextResponse.json({ result: "", success: false }, { status: 404 });
  } else if (!user.coverLetters || user.coverLetters.length === 0) {
    user.coverLetters = [payload];
  } else {
    user.coverLetters.push(payload);
  }
  const response = await user.save();
  return NextResponse.json(
    { result: response, success: true },
    { status: 200 }
  );
}

// export async function POST(request: any) {
//   const session = await getServerSession(authOptions);
//   if (session) {
//     try {
//       const payload = await request.json();

//       const response = postCoverLetter(payload);

//       return NextResponse.json(
//         { result: response, success: true },
//         { status: 200 }
//       );
//     } catch (error) {
//       console.log(error);
//       return NextResponse.json(
//         { result: "Internal Server Error", success: false },
//         { status: 404 }
//       );
//     }
//   } else {
//     return NextResponse.json(
//       { result: "Not Authorised", success: false },
//       { status: 401 }
//     );
//   }
// }

// export async function GET(request: any) {
//   try {
//     await startDB();
//     const coverletters = await user.find();
//     return NextResponse.json({ success: true, coverletters }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { result: "Internal Server Error", success: false },
//       { status: 500 }
//     );
//   }
// }
