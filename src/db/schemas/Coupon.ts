import mongoose from "mongoose";
const { Schema } = mongoose;

const CouponSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    amount_off: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    currency: String,
    duration: {
      type: String,
      enum: ["once", "repeating", "forever"],
      required: true,
    },
    duration_in_months: {
      type: Number,
      min: 1,
    },
    livemode: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    percent_off: {
      type: Number,
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
    valid: {
      type: Boolean,
      default: true,
    },
    times_redeemed: {
      type: Number,
      default: 0,
    },
  },

  { timestamps: true }
);

export default mongoose.models.Coupon || mongoose.model("Coupon", CouponSchema);
