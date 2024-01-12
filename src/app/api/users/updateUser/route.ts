import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { NextResponse } from "next/server";

export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

export async function POST(req: any) {
  try {
    const _body = await req.json();

    const newFile = _body.newFile;
    const email = _body.email;

    if (newFile && email) {
      await startDB();

      try {
        const updatedUser = await User.findOneAndUpdate(
          { email: email },
          { $push: { files: newFile } },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        if (updatedUser) {
          return NextResponse.json(
            {
              result: "Success Record Updated",
              success: true,
            },
            { status: 200 }
          );
        } else {
          return NextResponse.json(
            {
              result: "User not found",
              success: false,
            },
            { status: 500 }
          );
        }
      } catch (error) {
        console.error(error);
        return NextResponse.json(
          {
            result: "Error Updating User",
            success: false,
          },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        {
          result: "Bad Request. Both 'newFile' and 'email' are required.",
          success: false,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        result: "Something Went Wrong",
        success: false,
      },
      { status: 500 }
    );
  }
}

// import User from "@/db/schemas/User";
// import startDB from "@/lib/db";
// import { NextResponse } from "next/server";
// export const maxDuration = 300; // This function can run for a maximum of 5 seconds
// export const dynamic = "force-dynamic";

// export async function POST(req: any) {
//   try {
//     let _body = await req.json();

//     // const newFile = req?.body?.newFile;
//     const newFile = _body.newFile;
//     // const email = req?.body?.email;
//     const email = _body.email;

//     if (newFile && email) {
//       await startDB();
//       User.findOneAndUpdate(
//         { email: email },
//         { $push: { files: newFile } },
//         { new: true, upsert: true, setDefaultsOnInsert: true }
//       )
//         .then((updatedUser) => {
//           if (updatedUser) {
//             return NextResponse.json(
//               {
//                 msg: "Success Record Updated",
//                 success: true,
//               },
//               { status: 200 }
//             );
//           } else {
//             return NextResponse.json(
//               {
//                 error: "User not found",
//                 success: false,
//               },
//               { status: 500 }
//             );
//           }
//         })
//         .catch((error) => {
//           return NextResponse.json(
//             {
//               error: "Error Updating User",
//               success: false,
//             },
//             { status: 500 }
//           );
//         });
//     }
//   } catch {
//     return NextResponse.json(
//       {
//         result: "Something Went Wrong",
//         success: false,
//       },
//       { status: 500 }
//     );
//   }
// }
