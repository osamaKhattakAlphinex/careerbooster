import mongoose from "mongoose";

const URL = process.env.MONGODB_URI || "";

const connectDB = (handler: any) => async (req: any, res: any) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }

  await mongoose.connect(URL);
  return handler(req, res);
};

export default connectDB;
