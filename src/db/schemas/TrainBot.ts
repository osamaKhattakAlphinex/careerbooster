import mongoose from "mongoose";
const { Schema } = mongoose;

const TrainBotSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    input: {
      type: String,
      required: true,
    },
    output: {
      type: String,
      required: true,
    },
    idealOutput: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "trained"],
      required: true,
    },
  },

  { timestamps: true }
);

export default mongoose.models.TrainBot ||
  mongoose.model("TrainBot", TrainBotSchema);
