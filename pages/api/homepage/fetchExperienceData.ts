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

      // const parser = StructuredOutputParser.fromZodSchema(
      //   z.object({
      //     experiences: z
      //       .array(
      //         z.object({
      //           fields: z.object({
      //             // id: z.string().describe("random non-repeated id"),
      //             jobTitle: z.string().describe("Job Title e.g. Software Dev"),
      //             company: z
      //               .string()
      //               .describe("Company Name e.g. Google, Facebook, etc"),
      //             country: z
      //               .string()
      //               .describe("Country Name e.g. Nigeria, United States, etc"),
      //             cityState: z
      //               .string()
      //               .describe(
      //                 "City and State e.g. Lagos, Lagos State, New York, New York State, etc"
      //               ),
      //             fromMonth: z
      //               .string()
      //               .describe("Job Starting Month e.g May, January"),
      //             fromYear: z
      //               .string()
      //               .describe("Job Starting Year e.g 2023, 1997"),
      //             isContinue: z
      //               .boolean()
      //               .describe("Is Experience continued? e.g true, false"),
      //             toMonth: z.string().describe("Job Ending Month "),
      //             toYear: z.string().describe("Job Ending Year"),
      //             description: z
      //               .string()
      //               .describe(
      //                 "Short Description About the Job e.g I did this and that"
      //               ),
      //           }),
      //         })
      //       )
      //       .describe(
      //         "List of all Educations from the provided Data without Skipping any of the Education. Each education has the following fields: id, company, educationLevel, fieldOfStudy, schoolName, schoolLocation, fromMonth, fromYear, isContinue, toMonth, toYear. "
      //       ),
      //   })
      // );

      const input = `
          This is the User Data:
          ${content}

          Now please give me a List of All Experiences from the above content provided.

          The answer MUST be a valid JSON and formatting should be like this 
          replace the VALUE_HERE with the actual values
          {
            experiences: [
              {
                jobTitle: VALUE_HERE,
                company: VALUE_HERE (Company Name),
                country: VALUE_HERE,
                cityState: VALUE_HERE,
                fromMonth: VALUE_HERE (in full e.g. January, May),
                fromYear: VALUE_HERE (in full e.g 2023, 1997),
                toMonth: VALUE_HERE (in full e.g. January, May)
                toYear: VALUE_HERE (in full e.g 2023, 1997),
                description: VALUE_HERE,
                isContinue: VALUE_HERE (Is Experience continued? e.g true, false),
              },
              .
              .
              .
            ]
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
};
export default handler;
