import mongoose from "mongoose";
const { Schema } = mongoose;
import { NextResponse } from "next/server";
import startDB from "@/lib/db";
import FineTuningSetting from "@/db/schemas/FineTuningSetting";
import TrainedModel from "@/db/schemas/TrainedModel";
import TrainBot from "@/db/schemas/TrainBot";

export type UpdateTrainBotEntryType = {
  entryId: String;
  type: String;
  //   input: String;
  output: String;
  //   idealOutput: String;
  //   status: "pending" | "reviewed" | "trained";
  //   userEmail: String;
  //   fileAddress: String;
  //   Instructions: String;
};

export const updateTrainedBotEntry = async (entry: UpdateTrainBotEntryType) => {
  try {
    await startDB();
    // Getting the dataset model if trained previously
    await TrainBot.findOneAndUpdate(
      { entryId: entry.entryId, type: entry.type },
      { $set: { output: entry.output } },
      { new: true }
    );
  } catch (error) {
    console.error("Error fetching trained model:", error);
  }
};
