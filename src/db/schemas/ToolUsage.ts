import mongoose from "mongoose";
const { Schema } = mongoose;

const ToolUsageSchema = new Schema(
  {
    toolName: {
      type: String,
    },
    creditsUsed: {
        type: Number,
    },
  },

  { timestamps: true }
);

export default mongoose.models.ToolUsage ||
  mongoose.model("ToolUsage", ToolUsageSchema);
