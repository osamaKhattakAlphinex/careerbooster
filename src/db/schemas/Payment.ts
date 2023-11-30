import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcrypt";
import { assert } from "console";

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

// PaymentSchema.pre("save", async function (next) {
//   try {
//     const saltRounds = 10;

//     // Hash amountPaid
//     const hashedAmount = await bcrypt.hash(
//       this.amountPaid.toString(),
//       saltRounds
//     );
//     this.amountPaid = hashedAmount;

//     next();
//   } catch (error: any) {
//     next(error);
//   }
// });

export default mongoose.models.Payment ||
  mongoose.model("Payment", PaymentSchema);
