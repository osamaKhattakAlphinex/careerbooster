import { NextApiHandler } from "next";
import { OpenAI } from "langchain/llms/openai";

const handler: NextApiHandler = async (req, res) => {
  if (req.body) {
    const reqBody = req.body;
    const content = reqBody.content;
    const jobTitle = reqBody.jobTitle;
    const company = reqBody.company;
    const personName = reqBody.personName;

    if (content) {
      // CREATING LLM MODAL
      const model = new OpenAI({
        modelName: "gpt-3.5-turbo",
        temperature: 0.5,
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
        const resp = await model.call(input);

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
        return res.status(200).json({
          success: true,
          data: resp,
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
