import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

// export async function PUT(
//   req: any,
//   { params }: { params: { coverLetterId: string } }
// ) {
//   const packgeId = params.packgeId;
//   const payload = await req.json();

//   console.log(packgeId);

//   try {
//     await startDB();

//     let userPackage = await UserPackage.findOneAndUpdate(
//       { _id: packgeId },
//       payload,
//       { new: true }
//     );

//     return NextResponse.json({ result: userPackage, success: true });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       { result: "Internal Server Error", success: false },
//       { status: 404 }
//     );
//   }
// }

export async function DELETE(
  req: any,
  { params }: { params: { coverLetterId: string } }
) {
  try {
    let email: any = "";
    const coverLetterId = params.coverLetterId;

    const session = await getServerSession(authOptions);

    email = session?.user?.email;

    await startDB();

    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { $pull: { coverLetters: { id: coverLetterId } } },
      { new: true }
    );

    return NextResponse.json(
      { success: true, coverLetters: updatedUser.coverLetters },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { result: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
