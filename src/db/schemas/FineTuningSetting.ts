import mongoose from "mongoose";
const { Schema } = mongoose;

const FineTuningSettingSchema = new Schema(
  {
    tuningBaseModel: {
      type: String,
    },
    allowSendingDataToTuning: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.models.FineTuningSetting ||
  mongoose.model("FineTuningSetting", FineTuningSettingSchema);
