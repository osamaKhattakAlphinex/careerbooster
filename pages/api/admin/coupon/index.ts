import { NextApiRequest, NextApiResponse } from "next";
import startDB from "@/lib/db";
import Coupon from "@/db/schemas/Coupon";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Add new coupon
    try {
      await startDB();

      const { code, discount, forUserPackageCategory, expiresAt, status } =
        req.body;

      const coupon = new Coupon({
        code,
        discount,
        forUserPackageCategory,
        expiresAt,
        status,
      });

      await coupon.save();

      res.status(201).json({ success: true, data: coupon });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Server Error" });
    }
  } else if (req.method === "GET") {
    try {
      await startDB();

      const coupons = await Coupon.find();
      return res.status(200).json({ success: true, coupons });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}
