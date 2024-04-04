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
    // password: {
    //   type: String,
    //   required: true,
    // },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    registeredPhone: {
      type: String,
      // required: true,
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
// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     throw error;
//   }
// });
// UserSchema.methods.comparePassword = async function (password: any) {
//   try {
//     return await bcrypt.compare(password, this.password);
//   } catch (error) {
//     throw error;
//   }
// };

export default mongoose.models.User || mongoose.model("User", UserSchema);
