import mongoose from "mongoose";
const { Schema } = mongoose;

const PromptSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },

  { timestamps: true }
);

export default mongoose.models.Prompt || mongoose.model("Prompt", PromptSchema);
