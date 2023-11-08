import { NextApiHandler } from "next";
import LinkedinToolEntrie from "@/db/schemas/LinkedinToolEntrie";

const handler: NextApiHandler = async (req, res) => {
  try {
    
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
  
};
export default handler;
