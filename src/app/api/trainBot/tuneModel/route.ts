import { NextResponse } from "next/server";
import OpenAI, { toFile } from "openai";
import startDB from "@/lib/db";
import FineTuneModel from "@/db/schemas/FineTuningModel";

export const POST = async (
  req: any,
  { params }: { params: { recId: string } }
) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    await startDB();

    const formData = await req.formData();

    const file = formData.get("traing-file") as Blob | null;
    const datasetType = formData.get("record-type");

    if (!file) {
      return NextResponse.json(
        { error: "File blob is required." },
        { status: 400 }
      );
    }

    const _file = await toFile(file, "my-traing-file");

    const uploadedfile = await openai.files.create({
      file: _file,
      purpose: "fine-tune",
    });

    const fineTuneModel = await FineTuneModel.create({
      fileName: uploadedfile.filename,
      fileId: uploadedfile.id,
      tuningBaseModel: "N/A",
      status: "not-started",
      fineTunedModel: "N/A",
      fineTuningJobId: "N/A",
      datasetType: datasetType,
    });

    return NextResponse.json(
      { result: fineTuneModel, success: true },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { result: "Error processing data", success: false },
      { status: 500 }
    );
  }
};

export const GET = async (
  req: any,
  { params }: { params: { recId: string } }
) => {
  try {
    await startDB();
    const fineTuneModel = await FineTuneModel.find({});

    return NextResponse.json({
      success: true,
      data: fineTuneModel,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err,
    });
  }
};
