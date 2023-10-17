import { NextApiHandler } from "next";
import { OpenAI } from "langchain/llms/openai";

const handler: NextApiHandler = async (req, res) => {
  if (req.body) {
    const reqBody = req.body;
    const content = reqBody.content;
    const jobTitle = reqBody.jobTitle;
    const company = reqBody.company;

    if (content) {
      // CREATING LLM MODAL
      const model = new OpenAI({
        modelName: "gpt-3.5-turbo",
        temperature: 0.5,
      });

      const input = `
          This is the User Data:
          ${content}

          Here is the Job Title:
          ${jobTitle}

          Here is the Company Name:
          ${company}

          Now Find the Work Experience by Job Title and Company Name of the user from the above content provided.
          and return the following fields for that work experience:
           country, cityState, fromMonth, fromYear, isContinue, toMonth, toYear, description

          The answer MUST be a valid JSON and formatting should be like this 
          replace the VALUE_HERE with the actual values
          {
            country: VALUE_HERE,
            cityState: VALUE_HERE,
            fromMonth: VALUE_HERE (in full e.g. January, May),
            fromYear: VALUE_HERE (in full e.g 2023, 1997),
            toMonth: VALUE_HERE (in full e.g. January, May)
            toYear: VALUE_HERE (in full e.g 2023, 1997),
            description: VALUE_HERE,
            isContinue: VALUE_HERE (Is Experience continued? e.g true, false),
          }

          If there is only one year or date fill it in the toYear and toMonth field
          If there is only Year and no month for an experience record put the year in the toYear field and leave the toMonth field blank
          If there is no value Leave that field blank
          Months should be in full e.g. January, February, March, April, May, June, July, August, September, October, November, and December
      `;

      try {
        const resp = await model.call(input);
        // const resp = await chain4.call({ query: input });
        return res.status(200).json({ success: true, data: resp });
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
