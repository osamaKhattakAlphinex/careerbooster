import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: any) {
  try {
    const session = await getServerSession(authOptions);

    const _body = await req.json();

    if (session) {
      // const data = req?.body?.data;
      const data = _body.data;
      if (data && data.email) {
        // update user
        await startDB();
        User.findOneAndUpdate(
          { email: data.email },
          { $set: { ...data } },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        )
          .then((updatedUser) => {
            if (updatedUser) {
              return NextResponse.json(
                {
                  msg: "Updated",
                  success: true,
                },
                { status: 200 }
              );
              // return res.status(200).json({ success: true });
            } else {
              return NextResponse.json(
                {
                  error: "Error User not found",
                  success: false,
                },
                { status: 500 }
              );
              // return res.status(500).json({ error: `User not found` });
            }
          })
          .catch((error) => {
            return NextResponse.json(
              {
                error: "Error Updating Files",
                success: false,
              },
              { status: 500 }
            );
            // return res.status(500).json({ error: `Error Updating Files` });
          });
      } else {
        return NextResponse.json(
          {
            error: "Bad Request",
            success: false,
          },
          { status: 500 }
        );
        // return res.status(500).json({ error: "Bad Request" });
      }
    }
  } catch {
    return NextResponse.json(
      {
        result: "Something Went Wrong",
        success: false,
      },
      { status: 500 }
    );
  }
}
