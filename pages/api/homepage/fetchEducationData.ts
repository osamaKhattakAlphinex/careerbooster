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

      const input = `
          This is the User Data:
          ${content}

          Now please give me a List of All Education from the above content provided.

          The answer MUST be a valid JSON and formatting should be like this 
          replace the VALUE_HERE with the actual values
          {
            education: [
              {
                educationLevel: VALUE_HERE,
                fieldOfStudy: VALUE_HERE,
                schoolName: VALUE_HERE,
                schoolLocation: VALUE_HERE (Address of School),
                fromMonth: VALUE_HERE (in full e.g. January, May),
                fromYear: VALUE_HERE (in full e.g 2023, 1997),
                toMonth: VALUE_HERE (in full e.g. January, May)
                toYear: VALUE_HERE (in full e.g 2023, 1997),
                isContinue: VALUE_HERE (Is Education continued? e.g true, false),
              },
              .
              .
              .
            ]
          }

          if there is only one year or date fill it in the toYear and toMonth field
          If there is only Year and no month for an education record put the year in the toYear field and leave the toMonth field blank
          If there is no value Leave that field blank
          Months should be in full e.g. January, February, March, April, May, June, July, August, September, October, November, and December
      `;

      try {
        const resp = await model.call(input);
        // make a trainBot entry
        const obj = {
          type: "register.wizard.listEducation",
          input: input,
          output: resp,
          idealOutput: "",
          status: "pending",
          userEmail: trainBotData.userEmail,
          fileAddress: trainBotData.fileAddress,
          Instructions: `Get List of all Education`,
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
