import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    registeredPhone: {
      type: String,
    },

    linkedin: {
      type: String,
      unique: true,
    },

    profileImage: String,
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
    interests: [],
    awards: [],
    publications: [],
    trainings:[],
    references: [],
    languages: [],
    certifications: [],
    projects:[],
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
    trialResume: {
      type: Boolean,
      default: false,
    },
    emails: [],
    resumes: [],
    coverLetters: [],
    consultingBids: [],
    linkedInAbouts: [],
    linkedInHeadlines: [],
    linkedInJobDescriptions: [],
    linkedInKeywords: [],
    uploadedResume: {},
    chatThreads: {},
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
    userCredits: {
      type: Number,
      default: 0,
    },
    totalCredits: {
      type: Number,
      default: 0,
    },
    OpenAiTokensUsed: {
      type: Number,
      default: 0,
    },
    creditPackage: {
      type: Schema.Types.ObjectId,
      ref: "CreditPackage",
    },
    tours: {
      resumeBuilder: Boolean,
      coverLetter: Boolean,
      emailAssistant: Boolean,
      linkedinOptimizer: Boolean,
      dashboard: Boolean,
    },
  },

  { timestamps: true }
);


export default mongoose.models.User || mongoose.model("User", UserSchema);
