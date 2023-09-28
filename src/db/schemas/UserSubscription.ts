import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSubscriptionScehema = new Schema(
  {
    userPackage: {
      type: Schema.Types.ObjectId,
      ref: "UserPackage",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    expirationDateTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.models.UserSubscription ||
  mongoose.model("UserSubscription", UserSubscriptionScehema);
