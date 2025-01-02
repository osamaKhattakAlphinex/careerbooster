import Notification from "@/db/schemas/Notification";
import startDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// PUT request handler
export async function PUT(
  req: NextRequest,
  { params }: { params: { notificationsId: string } }
) {
  const response = await req.json();

  try {
    const updatedNotification = await Notification.findOneAndUpdate(
      { _id: params.notificationsId },
      {
        $set: {
          title: response.title,
          sender: response.sender,
          message: response.message,
          read: response.read,
        },
      }
    );
    return NextResponse.json({
      message: "User Has Been Updated",
      status: 200,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Something Went wrong",
      status: 404,
      success: false,
    });
  }
}

// DELETE API
export async function DELETE(req: NextRequest, { params }: {params: {notificationsId: string}}) {
  try {
    const deletedNotification = await Notification.findByIdAndDelete({
      _id: params.notificationsId,
    });
    return NextResponse.json({ message: "Deleted", status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "errors", status: 404 });
  }
}
