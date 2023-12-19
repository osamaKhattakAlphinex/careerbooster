import { NextResponse } from "next/server";
import { OpenAI } from "langchain/llms/openai";

export const maxDuration = 10; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";
function removeSpecialChars(str: string) {
  // Remove new lines
  str = str.replace(/[\r\n]+/gm, "");

  // Remove Unicode characters
  str = str.replace(/[^\x00-\x7F]/g, "");

  // Remove icons
  str = str.replace(/[^\w\s]/gi, "");

  return str;
}
export async function POST(req: any) {
  try {
    const body = await req.json();
    if (body) {
      const reqBody = body;
      const content = removeSpecialChars(reqBody.content);
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
    
              cityState:  name of the city or state where the ${personName} worked in ${company},
    
              fromMonth: means the month when ${personName} started working at ${company}, 
    
              fromYear: means the year when ${personName} started working at ${company},
    
              toMonth: means the month when ${personName} stopped working at ${company},
    
              toYear: means the year when ${personName} stopped working at ${company}
    
              isContinue: means if ${personName},  is still working there or not (Is Experience continued? e.g true, false)
    
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
    
              If there is no value for any field Leave that field blank(empty) string and do not add labels like N/A or Not Available etc.
              If there is only starting Year when person started working and no month for an experience record put the year in the fromYear field and leave the fromMonth field blank.
              If there is only ending Year when person stopped working and no month for an experience record put the year in the toYear field and leave the toMonth field blank.`;

        const resp = await model.call(input);

        return NextResponse.json(
          { success: true, result: resp, input: input },
          { status: 200 }
        );
      }
    }
  } catch (error) {
    return NextResponse.json(
      { result: "something went wrong", success: false },
      { status: 500 }
    );
  }
}
