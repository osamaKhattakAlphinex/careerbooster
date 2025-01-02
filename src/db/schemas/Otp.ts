import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcrypt";

const OtpSchema = new Schema(
  {
   
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },

    expiry: {
      type: Number,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);
OtpSchema.pre("save", async function (next) {
  if (!this.isModified("otp")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.otp = await bcrypt.hash(this.otp, salt);
    next();
  } catch (error) {
    throw error;
  }
});
OtpSchema.methods.compareOtp = async function (otp: string) {
  try {
    return await bcrypt.compare(otp, this.otp);
  } catch (error) {
    throw error;
  }
};

export default mongoose.models.Otp || mongoose.model("Otp", OtpSchema);
