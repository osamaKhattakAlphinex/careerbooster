import mongoose from "mongoose";
const { Schema } = mongoose;

const TrainedModelSchema = new Schema(
  {
    dataset: {
      type: String,
    },
    model: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.TrainedModel ||
  mongoose.model("TrainedModel", TrainedModelSchema);
