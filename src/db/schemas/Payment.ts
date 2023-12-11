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

// import mongoose from "mongoose";
// const { Schema } = mongoose;
// import bcrypt from "bcrypt";
// import { assert } from "console";

// const PaymentSchema = new Schema(
//   {
//     userEmail: {
//       type: String,
//       required: true,
//     },
//     amountPaid: {
//       // we are hashing the paid amount,
//       // we need a string here to be encrypted number can be encrypted,
//       // but when saving it gives error string cannot be assigned to number.
//       // that's why the type of amount Paid is changed.
//       type: String,
//       required: true,
//     },
//     PackageId: {
//       type: Schema.Types.ObjectId,
//       ref: "UserPackage",
//     },
//   },

//   { timestamps: true }
// );

// PaymentSchema.pre("save", async function (next) {
//   try {
//     console.log("----------------hasing-------------");

//     const saltRounds = 10;

//     // Hash userEmail
//     const hashedEmail = await bcrypt.hash(this.userEmail, saltRounds);
//     this.userEmail = hashedEmail;

//     // Hash amountPaid
//     const hashedAmount = await bcrypt.hash(
//       this.amountPaid.toString(),
//       saltRounds
//     );
//     this.amountPaid = hashedAmount;

//     // Hash PackageId if it exists
//     if (this.PackageId) {
//       const hashedPackage = await bcrypt.hash(
//         this.PackageId.toString(),
//         saltRounds
//       );
//       this.PackageId = new mongoose.Types.ObjectId(hashedPackage);
//     }

//     next();
//   } catch (error: any) {
//     next(error);
//   }
// });

// export default mongoose.models.Payment ||
//   mongoose.model("Payment", PaymentSchema);
