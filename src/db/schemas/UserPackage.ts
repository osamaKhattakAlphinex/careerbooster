import mongoose from "mongoose";
const { Schema } = mongoose;

export interface UserPackageData {
  type: "monthly" | "yearly";
  title: string;
  amount: number;
  status: "active" | "inactive";
  features: string[];
  category: "basic" | "standard" | "premium";
  limit: {
    resumes_generation: number;
    can_edit_resume: boolean;
    keywords_generation: number;
    headline_generation: number;
    about_generation: number;
    job_desc_generation: number;
    cover_letter_generation: number;
    pdf_files_upload: number;
    review_resume: number;
    consulting_bids_generation: number;
  };
}

const UserPackageScehema = new Schema(
  {
    type: {
      type: String,
      enum: ["monthly", "yearly"],
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
      deafult: 0,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
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

export default mongoose.models.UserPackage ||
  mongoose.model("UserPackage", UserPackageScehema);
