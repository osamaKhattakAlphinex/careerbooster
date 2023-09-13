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
      //     education: z
      //       .array(
      //         z.object({
      //           fields: z.object({
      //             // id: z.string().describe("random non-repeated id"),
      //             company: z.string().describe("company name"),
      //             educationLevel: z
      //               .string()
      //               .describe("Education level or Degree Name e.g. Bachelors"),
      //             fieldOfStudy: z
      //               .string()
      //               .describe("Field of Study e.g. Computer Science"),
      //             schoolName: z
      //               .string()
      //               .describe(
      //                 "School, university, college Name e.g. University of Lagos"
      //               ),
      //             schoolLocation: z
      //               .string()
      //               .describe(
      //                 "Address or Location of School, university, college"
      //               ),
      //             fromMonth: z
      //               .string()
      //               .describe("From Month in full e.g May, January"),
      //             fromYear: z
      //               .string()
      //               .describe("From Year in full e.g 2023, 1997"),
      //             isContinue: z
      //               .boolean()
      //               .describe("Is Education continued? e.g true, false"),
      //             toMonth: z
      //               .string()
      //               .describe("To Month in full e.g May, January"),
      //             toYear: z.string().describe("To Year in full e.g 2023, 1997"),
      //           }),
      //         })
      //       )
      //       .describe(
      //         "List of all Educations from the provided Data without Skipping any of the Education. Each education has the following fields: id, company, educationLevel, fieldOfStudy, schoolName, schoolLocation, fromMonth, fromYear, isContinue, toMonth, toYear. The Array you return must be sorted by year the latest one on top and oldest on the bottom"
      //       ),
      //   })
      // );

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
                schoolLocation: VALUE_HERE,
                fromMonth: VALUE_HERE,
                fromYear: VALUE_HERE,
                isContinue: VALUE_HERE (Is Education continued? e.g true, false),
                toMonth: VALUE_HERE,
                toYear: VALUE_HERE,
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
