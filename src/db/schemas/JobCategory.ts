import mongoose from "mongoose";
const { Schema } = mongoose;

const JobCategoriesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    totalJobs: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const JobCategory =
  mongoose.models.JobCategory ||
  mongoose.model("JobCategory", JobCategoriesSchema);
export default JobCategory;
