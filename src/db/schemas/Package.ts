import mongoose from "mongoose";
const { Schema } = mongoose;

const PackageScehema = new Schema(
  {
    type: {
      type: String,
      enum: ["monthly", "yearly"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      deafult: 0,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: true,
    },
    features: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      enum: ["basic", "standard", "premium"],
      required: true,
    },
    limit: {
      resumes_generation: Number,
      can_edit_resume: Boolean,
      keywords_generation: Number,
      headline_generation: Number,
      about_generation: Number,
      job_desc_generation: Number,
      cover_letter_generation: Number,
      pdf_files_upload: Number,
      review_resume: Number,
      consulting_bids_generation: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Package ||
  mongoose.model("Package", PackageScehema);
