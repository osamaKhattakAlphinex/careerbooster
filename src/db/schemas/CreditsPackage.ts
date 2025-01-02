import mongoose from "mongoose";
const { Schema } = mongoose;

export interface CreditsPackageData {
    _id?: string;
    title: string;
    amount: number;
    status: "active" | "inactive";
    features: string[];
    featuresToolTips: string[];
    category: "basic" | "standard" | "premium";
    totalCredits: number;
}

const CreditsPackageScehema = new Schema(
    {
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
            required: true,
        },
        features: {
            type: [String],
            default: [],
        },
        featuresToolTips: {
            type: [String],
            default: [],
        },
        category: {
            type: String,
            enum: ["basic", "standard", "premium"],
            required: true,
        },
        totalCredits: Number
    },
    { timestamps: true }
);

export default mongoose.models.CreditsPackage ||
    mongoose.model("CreditsPackage", CreditsPackageScehema);
