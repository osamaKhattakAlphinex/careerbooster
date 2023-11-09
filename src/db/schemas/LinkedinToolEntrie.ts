import mongoose from "mongoose";
const { Schema } = mongoose;

const LinkedinToolEntrieSchema = new Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    fileContent: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    recentJob: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "done"],
      required: true,
    },
    sendToCRM: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.LinkedinToolEntrie ||
  mongoose.model("LinkedinToolEntrie", LinkedinToolEntrieSchema);
