import mongoose from "mongoose";
const { Schema } = mongoose;

const JobSchema = new Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    employer: {
      type: String,
      required: true,
    },
    category: {
      type:String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    addedByUserId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    link: String,
    skills: [],
    rejectMsg: String,
    noOfProposals: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "active", "started", "rejected", "completed"],
      required: true,
    },
    featured: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Job = mongoose.models.Job || mongoose.model("Job", JobSchema);
export default Job;
