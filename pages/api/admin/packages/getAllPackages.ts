import { NextApiHandler } from "next";
import startDB from "@/lib/db";
import Package from "@/db/schemas/Package";

const handler: NextApiHandler = async (req, res) => {
  try {
    await startDB();

    const packages = await Package.find();
    return res.status(200).json({ success: true, packages });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
