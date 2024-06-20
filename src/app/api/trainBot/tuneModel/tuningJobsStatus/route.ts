import startDB from "@/lib/db";
import { NextResponse } from "next/server";
import OpenAI, { toFile } from "openai";
import FineTuneModel from "@/db/schemas/FineTuningModel";
import TrainedModel from "@/db/schemas/TrainedModel";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const GET = async () => {
  try {
    await startDB();

    const jobs = await openai.fineTuning.jobs.list();

    return NextResponse.json({
      success: true,
      jobs: jobs.data,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err,
    });
  }
};
