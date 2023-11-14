import { NextApiHandler } from "next";
// import { OpenAI } from "langchain/llms/openai";
import OpenAI from "openai";
import TrainBot from "@/db/schemas/TrainBot";

const handler: NextApiHandler = async (req, res) => {
  if (req.body) {
    const reqBody = JSON.parse(req.body);
    const content = reqBody.content;
    const trainBotData = reqBody.trainBotData;

    if (content) {
      // CREATING LLM MODAL
      // const model = new OpenAI({
      //   modelName: "gpt-3.5-turbo",
      //   temperature: 0.5,
      // });
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const input = `
          This is the User Data:
          ${content}

          Now please give me a List of All Work Experiences of this person from the above provided content.
          jobTitle means the job title of the work experience
          company means the company name of the work experience
          
          The answer MUST be a valid JSON and formatting should be like this 
          replace the VALUE_HERE with the actual values
          {
            experiences: [
              {
                jobTitle: VALUE_HERE,
                company: VALUE_HERE (Company Name),
              },
              .
              .
              .
            ]
          }

          If there is no value Leave that field blank
      `;

      try {
        // const resp = await model.call(input);
        const response = await openai.chat.completions.create({
          model: "ft:gpt-3.5-turbo-1106:careerbooster-ai::8IcrLzWo",
          messages: [
            {
              role: "user",
              content: input,
            },
          ],
          temperature: 1,
        });

        // make a trainBot entry
        const obj = {
          type: "register.wizard.listExperiences",
          input: input,
          output: response.choices[0].message.content,
          idealOutput: "",
          status: "pending",
          userEmail: trainBotData.userEmail,
          fileAddress: trainBotData.fileAddress,
          Instructions: `Get List of all Experiences with jobTitle and company only just check if the list is missing any data`,
        };

        await TrainBot.create({ ...obj });
        // const resp = await chain4.call({ query: input });
        return res
          .status(200)
          .json({ success: true, data: response.choices[0].message.content });
      } catch (error) {
        return res.status(400).json({ success: false, error });
      }
    }
  }
};
export default handler;
