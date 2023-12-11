import mongoose from "mongoose";
const { Schema } = mongoose;
import { NextResponse } from "next/server";
import startDB from "@/lib/db";
import FineTuningSetting from "@/db/schemas/FineTuningSetting";
import TrainedModel from "@/db/schemas/TrainedModel";
import TrainBot from "@/db/schemas/TrainBot";

export type TrainBotEntryType = {
  entryId: String;
  type: String;
  input: String;
  output: String;
  idealOutput: String;
  status: "pending" | "reviewed" | "trained";
  userEmail: String;
  fileAddress: String;
  Instructions: String;
};

export const makeTrainedBotEntry = async (entry: TrainBotEntryType) => {
  try {
    await startDB();
    // Getting the dataset model if trained previously
    // console.log(entry);
    const trainBotEntry = new TrainBot(entry);
    trainBotEntry.save();

    // console.log(trainBotEntry);
  } catch (error) {
    console.error("Error fetching trained model:", error);
  }
};
