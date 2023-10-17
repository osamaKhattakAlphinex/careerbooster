import { NextApiHandler } from "next";
import { OpenAI } from "langchain/llms/openai";

const handler: NextApiHandler = async (req, res) => {
  if (req.body) {
    const reqBody = JSON.parse(req.body);
    const content = reqBody.content;

    if (content) {
      // CREATING LLM MODAL
      const model = new OpenAI({
        modelName: "gpt-3.5-turbo",
        temperature: 0.5,
      });

      const input = `
          This is the User Data:
          ${content}

          Now please give me a List of All Work Experiences of the user from the above content provided.

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
        const resp = await model.call(input);
        // const resp = await chain4.call({ query: input });
        return res.status(200).json({ success: true, data: resp });
      } catch (error) {
        return res.status(400).json({ success: false, error });
      }
    }
  }
};
export default handler;
