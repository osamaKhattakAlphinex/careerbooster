import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.body;
  const secret = process.env.JWT_SECRET;
  if (secret) {
    try {
      const decoded = jwt.verify(token, secret);
      // Do something with the decoded payload
      res.status(200).json({ success: true, decoded });
    } catch (error) {
      res.status(401).json({ success: false, message: "Invalid token" });
    }
  } else {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export default handler;
