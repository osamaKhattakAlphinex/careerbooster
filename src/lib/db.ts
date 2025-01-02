import mongoose from "mongoose";
const url = process.env.MONGODB_URI as string;

let connection: typeof mongoose;

const startDB = async () => {
  if (!connection) connection = await mongoose.connect(url);
  return connection;
};

export default startDB;
