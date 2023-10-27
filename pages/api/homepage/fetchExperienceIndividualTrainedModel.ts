import { NextApiHandler } from "next";
import OpenAI from "openai";
import TrainBot from "@/db/schemas/TrainBot";

const handler: NextApiHandler = async (req, res) => {
  if (req.body) {
    const reqBody = req.body;
    const content = reqBody.content;
    const jobTitle = reqBody.jobTitle;
    const company = reqBody.company;
    const personName = reqBody.personName;
    const trainBotData = reqBody.trainBotData;

    if (content) {
      // CREATING LLM MODAL
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const input = `
      This is the User Data:
          ${content}
          ___________________

          Now Find the details for  Job Title: ${jobTitle} at  ${company}  from the above provided User Data.
          and provide the following fields for that work experience:
          country, cityState, fromMonth, fromYear, isContinue, toMonth, toYear, description
          country: name of the country where this person worked in ${company}
          cityState:  name of the city or state where this person worked in ${company}
          fromMonth: means the month when this person started working at ${company} The month name must be in full e.g. Juanuary, February etc.
          fromYear: means the year when this person started working at ${company}
          toMonth: means the month when this person stopped working at ${company} The month name must be in full e.g. Juanuary, February etc.
          toYear: means the year when this person stopped working at ${company}
          isContinue: means if the person  is still working there or not (Is Experience continued? e.g true, false)
          description: fetch Work experience description of this person at ${company} from the User Data provided.

          The answer MUST be a valid JSON and formatting should be like this
          replace the VALUE_HERE with the actual values
          {
            country: VALUE_HERE,
            cityState: VALUE_HERE,
            fromMonth: VALUE_HERE,
            fromYear: VALUE_HERE,
            toMonth: VALUE_HERE,
            toYear: VALUE_HERE,
            isContinue: VALUE_HERE,
            description: VALUE_HERE
          }

          If there is no value for any field Leave that field blank e.g: ""  and do not add labels like "N/A", "Unknown" or "Not Available" etc.`;

      try {
        const response = await openai.chat.completions.create({
          model: "ft:gpt-3.5-turbo-0613:careerbooster-ai::8Dvh6dPq", // v2
          messages: [
            {
              role: "user",
              content: input,
            },
          ],
          temperature: 1,
          max_tokens: 456,
        });

        // make a trainBot entry
        const obj = {
          type: "register.wizard.individualExperience",
          input: input,
          output: response.choices[0].message.content,
          idealOutput: "",
          status: "pending",
          userEmail: trainBotData.userEmail,
          fileAddress: trainBotData.fileAddress,
          Instructions: `Find [[${jobTitle}]] at  [[${company}]]`,
        };

        await TrainBot.create({ ...obj });

        return res.status(200).json({
          success: true,
          data: response.choices[0].message.content,
          input: input,
        });
      } catch (error) {
        return res.status(400).json({ success: false, error, input: input });
      }
    }
  }
  return res
    .status(400)
    .json({ success: false, error: "Somethign went wrong" });
};
export default handler;
