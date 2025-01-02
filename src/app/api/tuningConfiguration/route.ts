import { NextRequest, NextResponse } from "next/server";
import startDB from "@/lib/db";
import FineTuningSetting from "@/db/schemas/FineTuningSetting";

export const GET = async () => {
  try {
    await startDB();
    const settings = await FineTuningSetting.findOne({});
    return NextResponse.json(
      {
        success: true,
        settings,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { tuningBaseModel, allowSendingDataToTuning } = await req.json();

    await startDB();

    const settings = await FineTuningSetting.findOne({});

    const newSettings = await FineTuningSetting.findOneAndUpdate(
      { _id: settings._id },
      {
        tuningBaseModel: tuningBaseModel,
        allowSendingDataToTuning: allowSendingDataToTuning,
      },
      { new: true }
    );

    return NextResponse.json(
      {
        success: true,
        settings: newSettings,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
};
