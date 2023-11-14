import { NextApiHandler } from "next";
import LinkedinToolEntrie from "@/db/schemas/LinkedinToolEntrie";
import startDB from "@/lib/db";

const handler: NextApiHandler = async (req, res) => {
  try {
    const { id } = req.body;
    await startDB();
    const exist = await LinkedinToolEntrie.findOne({ _id:id });
    if (exist) {
      const response = await LinkedinToolEntrie.updateOne(
        { _id: id },
        { $set: { sendToCRM : true } }
      );
      return res
        .status(200)
        .json({ message: "User Updated",success: true});
    } else {
      return res
        .status(400)
        .json({ errors: [{ msg: `${id} id not exists` }] });
    }
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};
export default handler;
