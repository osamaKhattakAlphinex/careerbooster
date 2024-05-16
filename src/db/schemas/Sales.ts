import mongoose from "mongoose";
const { Schema } = mongoose;

const SaleSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    ammount: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },

  { timestamps: true }
);

export default mongoose.models.Sale || mongoose.model("Sale", SaleSchema);
