import mongoose from "mongoose";
const { Schema } = mongoose;
import Cryptr from "cryptr";

const PaymentSchema = new Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    amountPaid: {
      type: String,
      required: true,
    },
    PackageId: {
      type: Schema.Types.ObjectId,
      ref: "UserPackage",
    },
  },
  { timestamps: true }
);

PaymentSchema.pre("save", async function (next) {
  try {
    const cryptr = new Cryptr("myTotallySecretKey", {
      encoding: "base64",
      pbkdf2Iterations: 10000,
      saltLength: 10,
    });

    this.userEmail = cryptr.encrypt(this.userEmail);
    this.amountPaid = cryptr.encrypt(this.amountPaid);

    next();
  } catch (error) {
    throw error;
  }
});

export default mongoose.models.Payment ||
  mongoose.model("Payment", PaymentSchema);
