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

    if (content) {
      // CREATING LLM MODAL
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const input = `
      This is the User Data:
          ${content}

          Now Find the details for  Job Title: ${jobTitle} at  ${company}  from the above provided User Data.

          and provide the following fields for that work experience:
          country, cityState, fromMonth, fromYear, isContinue, toMonth, toYear, description

          cityState:  name of the city or state where the ${personName} worked in ${company}

          fromMonth: means the month when ${personName} started working at ${company}

          fromYear: means the year when ${personName} started working at ${company}

          toMonth: means the month when ${personName} stopped working at ${company}

          toYear: means the year when ${personName} stopped working at ${company}

          isContinue: means if ${personName}  is still working there or not (Is Experience continued? e.g true, false)

          description: Work experience description of ${personName} at ${company}

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

          If there is no value for any field Leave that field blank string and do not add labels like N/A or Not Available etc.`;

      try {
        const response = await openai.chat.completions.create({
          model: "ft:gpt-3.5-turbo-0613:nausal-tech::8DCDhXkQ",
          messages: [
            {
              role: "user",
              content: input,
            },
          ],
          temperature: 1,
          max_tokens: 2048,
        });

        // const trainingDataset = {
        //   messages: [
        //     {
        //       role: "user",
        //       content: input,
        //     },
        //     {
        //       role: "assistant",
        //       content: resp,
        //     },
        //   ],
        // };
        // const resp = await chain4.call({ query: input });

        // make a trainBot entry
        const obj = {
          type: "register.wizard.individualExperience",
          input: input,
          output: response.choices[0].message.content,
          idealOutput: "",
          status: "pending",
        };

        await TrainBot.create({ ...obj });

        return res.status(200).json({
          success: true,
          data: response.choices[0].message.content,
          input: input,
          // trainingDataset: trainingDataset,
        });
      } catch (error) {
        return res.status(400).json({ success: false, error });
      }
    }
  }
  return res
    .status(400)
    .json({ success: false, error: "Somethign went wrong" });
};
export default handler;
