import { NextApiHandler } from "next";
import { OpenAI } from "langchain/llms/openai";
import TrainBot from "@/db/schemas/TrainBot";

const handler: NextApiHandler = async (req, res) => {
  if (req.body) {
    const reqBody = JSON.parse(req.body);
    const content = reqBody.content;
    const trainBotData = reqBody.trainBotData;

    if (content) {
      // CREATING LLM MODAL
      const model = new OpenAI({
        modelName: "gpt-3.5-turbo",
        temperature: 0.5,
      });

      // const parser = StructuredOutputParser.fromZodSchema(
      //   z.object({
      //     skills: z
      //       .array(z.string())
      //       .describe(
      //         "List of all Professional, primary, secondary, development, communication etc. Skills"
      //       ),
      //   })
      // );

      const input = `
          This is the User Data:
          ${content}

          Now please give me a List of all  Skills from the above content provided.

          The answer MUST be a valid Javascript JSON Array of Strings.
      `;

      try {
        const resp = await model.call(input);
        // make a trainBot entry
        const obj = {
          type: "register.wizard.listSkills",
          input: input,
          output: resp,
          idealOutput: "",
          status: "pending",
          userEmail: trainBotData.userEmail,
          fileAddress: trainBotData.fileAddress,
          Instructions: `Get List of all Skills`,
        };

        await TrainBot.create({ ...obj });

        // const resp = await chain4.call({ query: input });
        return res.status(200).json({ success: true, data: resp });
      } catch (error) {
        return res.status(400).json({ success: false, error });
      }
    }
  }
};
export default handler;
