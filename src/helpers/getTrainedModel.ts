import axios from "axios";

// export const getTrainedModel = async (dataset: string) => {
//   console.log("getTrainedModel starts with dataset", dataset);

//   if (dataset) {
//     try {
//       const response = await axios.get(`/api/trainBot/trainedModel/${dataset}`);
//       const model = response.data.model;
//       console.log("Getting Trained Model Data", model);
//       return model;
//     } catch (error) {
//       console.error("Error fetching trained model:", error);
//       return null; // or handle the error in an appropriate way
//     }
//   }

//   return null; // or handle the case where dataset is falsy
// };

import mongoose from "mongoose";
const { Schema } = mongoose;
import { NextResponse } from "next/server";
import startDB from "@/lib/db";
import FineTuningSetting from "@/db/schemas/FineTuningSetting";
import TrainedModel from "@/db/schemas/TrainedModel";

export const getTrainedModel = async (dataset: string) => {
  try {
    let model: string | null = null;
    await startDB();

    // Getting the dataset model if trained previously
    const datasetModel: any = await TrainedModel.findOne({
      dataset,
    });

    model = datasetModel ? datasetModel.model : null;

    // getting default model if trained model no found
    if (!model) {
      const defaultModel: any = await FineTuningSetting.findOne({});
      model = defaultModel ? defaultModel.tuningBaseModel : null;
    }

    return model;
  } catch (error) {
    console.error("Error fetching trained model:", error);
  }
};
