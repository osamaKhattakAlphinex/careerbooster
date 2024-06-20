import { NextRequest, NextResponse } from "next/server";

import startDB from "@/lib/db";
import Prompt from "@/db/schemas/Prompt";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    await startDB();
    const { type, name, value, active } = body;
    // first check if record already exists
    const current = await Prompt.findOne({ type, name });
    if (current) {
      current.value = value;
      current.active = active;
      current.save();

      return NextResponse.json(
        { result: current, success: true },
        { status: 200 }
      );
    } else {
      const newPrompt = new Prompt({
        type,
        name,
        value,
        active,
      });
      newPrompt.save().then((prompt: any) => {
        if (prompt) {
          return NextResponse.json(
            { result: prompt, success: true },
            { status: 200 }
          );
        } else {
          return NextResponse.json(
            { result: "Error Saving Prompt", success: false },
            { status: 500 }
          );
        }
      });
    }
  } catch (error) {
    return NextResponse.json(
      { result: "Error Saving Prompt", success: false },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  try {
    await startDB();

    const prompts = await Prompt.find({ active: true, type: type });
    if (prompts.length > 0) {
      return NextResponse.json(
        { result: prompts, success: true },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { result: "Prompts not Found", success: false },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { result: "Error getting Prompts", success: false },
      { status: 500 }
    );
  }
}
