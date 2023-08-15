import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcrypt";

interface Methods {
  comparePassword(password: string): Promise<boolean>;
}
const UserSchema = new Schema(
  {
    // avatar: String,
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
  },

  { timestamps: true }
);
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    throw error;
  }
});
UserSchema.methods.comparePassword = async function (password: any) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};
// const User = mongoose.models.User || mongoose.model("User", UserSchema);
// export default User;

export default mongoose.models.User || mongoose.model("User", UserSchema);
