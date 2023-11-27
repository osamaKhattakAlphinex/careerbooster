import mongoose from "mongoose";
const { Schema } = mongoose;

const PaymentSchema = new Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    PackageId: {
      type: Schema.Types.ObjectId,
      ref: "UserPackage",
    },
  },

  { timestamps: true }
);

export default mongoose.models.Payment ||
  mongoose.model("Payment", PaymentSchema);
