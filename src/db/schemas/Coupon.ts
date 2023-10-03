import mongoose from "mongoose";
const { Schema } = mongoose;

const CouponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    discount: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    forUserPackageCategory: {
      type: String,
      enum: ["basic", "standard", "premium"],
      required: true,
    },
    expiresAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      required: true,
    },
  },

  { timestamps: true }
);

export default mongoose.models.Coupon || mongoose.model("Coupon", CouponSchema);
