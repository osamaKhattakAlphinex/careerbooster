import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcrypt";

interface Methods {
  comparePassword(password: string): Promise<boolean>;
}
const UserSchema = new Schema(
  {
    // avatar: String,
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
    },
    contact: {
      country: String,
      street: String,
      cityState: String,
      postalCode: String,
    },
    status: {
      type: Boolean,
      required: true,
    },
    education: [],
    experience: [],
    skills: [],
    role: {
      type: String,
      default: "user",
    },
    files: [
      {
        id: String,
        fileName: String,
        fileContent: String,
        uploadedDateTime: String,
      },
    ],
    emails: [],
    resumes: [],
    coverLetters: [],
    consultingBids: [],
    linkedInAbouts: [],
    linkedInHeadlines: [],
    linkedInJobDescriptions: [],
    linkedInKeywords: [],
    uploadedResume: {},
    wizardCompleted: {
      type: Boolean,
      default: false,
    },
    wizardReviewed: {
      type: Boolean,
      default: false,
    },
    alertConsent: {
      type: Boolean,
      default: false,
    },
    userPackage: {
      type: Schema.Types.ObjectId,
      ref: "UserPackage",
    },
    userPackageExpirationDate: {
      type: Date,
    },
    userPackageUsed: {
      resumes_generation: Number,
      keywords_generation: Number,
      headline_generation: Number,
      about_generation: Number,
      job_desc_generation: Number,
      cover_letter_generation: Number,
      email_generation: Number,
      pdf_files_upload: Number,
      review_resume: Number,
      consulting_bids_generation: Number,
    },
    results: {
      keywords: String,
      headline: String,
      about: String,
      jobDescription: String,
      coverLetter: String,
      emailGeneration: String,
      consultingBidsGeneration: String,
    },
  },

  { timestamps: true }
);
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    throw error;
  }
});
UserSchema.methods.comparePassword = async function (password: any) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

export default mongoose.models.User || mongoose.model("User", UserSchema);
