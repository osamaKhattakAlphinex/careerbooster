import { NextApiHandler } from "next";
import startDB from "@/lib/db";
import Prompt from "@/db/schemas/Prompt";

const handler: NextApiHandler = async (req, res) => {
  // GET
  if (req.method === "GET") {
    try {
      await startDB();
      Prompt.find({ active: true, type: req.query.type })
        .then((prompts) => {
          if (prompts) {
            return res.status(200).json({ success: true, prompts });
          } else {
            return res.status(500).json({ error: `No Prompts Found` });
          }
        })
        .catch((error) => {
          return res.status(500).json({ error: `Error getting Prompts` });
        });
    } catch (error) {
      return res.status(500).json({ error: `Error getting Prompts` });
    }
  }

  if (req.method === "POST") {
    try {
      await startDB();
      const { type, name, value, active } = req.body;

      // first check if record already exists
      const current = await Prompt.findOne({ type, name });
      if (current) {
        current.value = value;
        current.active = active;
        current.save();
        return res.status(200).json({ success: true, prompt: current });
      } else {
        const newPrompt = new Prompt({
          type,
          name,
          value,
          active,
        });
        newPrompt.save().then((prompt: any) => {
          if (prompt) {
            return res.status(200).json({ success: true, prompt });
          } else {
            return res.status(500).json({ error: `Error saving Prompt` });
          }
        });
      }
    } catch (error) {
      return res.status(500).json({ error: `Error saving Prompt` });
    }
  }
};
export default handler;
