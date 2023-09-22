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

          Now please give me the following information about the user:
          First Name:
          Last Name:
          Email Address:
          Phone / Mobile Number:
          Country Name:
          Street Address:
          City or/and State Name:
          Postal Code from the provided data or get from the name of the City:


          The answer MUST be a valid JSON and formatting should be like this 
          replace the VALUE_HERE with the actual value
          {
            firstName: VALUE_HERE,
            lastName: VALUE_HERE,
            email: VALUE_HERE,
            phone: VALUE_HERE,
            country: VALUE_HERE,
            street: VALUE_HERE,
            cityState: VALUE_HERE,
            postalCode: VALUE_HERE,
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
