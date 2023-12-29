import { TrainBotEntryType, makeTrainedBotEntry } from "@/helpers/makeTrainBotEntry";
import { postJobDescriptions } from "../jdGeneratorSingle/linkedInJobDescription/route";
import Prompt from "@/db/schemas/Prompt";
import startDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    try {

        const reqBody = await req.json();
        let inputPrompt: string = ""
        const trainBotData = reqBody?.trainBotData;
        const jobDescriptionId = reqBody?.jobDescriptionId;
        const email = reqBody?.email;
        const personName = reqBody?.personName;
        const experiences = reqBody?.experiences;
        await startDB()
        const promptRec = await Prompt.findOne({
            type: "linkedin",
            name: "jobDescription",
            active: true,
        });
        let prompt = promptRec.value;
        for (const [index, experience] of experiences.entries()) {

            prompt = prompt.replaceAll("{{PersonName}}", personName);
            prompt = prompt.replaceAll("{{JobTitle}}", experience.jobTitle)

            inputPrompt += ` ${prompt} 
    Here is the work experience: 
      Job Title: ${experience.jobTitle}
      Company Name: ${experience.company}
      From Month: ${experience.fromMonth}
      From Year: ${experience.fromYear}
      To Month: ${experience.toMonth}
      To Year: ${experience.toYear}
      is the job continued: ${experience.isContinue}
      Job Description: ${experience.description}
      Company country: ${experience.country}
      Company city,State: ${experience.cityState}
      `;
        }
        const payload = {
            id: jobDescriptionId,
            jobDescriptionText: "",
            generatedOnDate: new Date().toISOString(),
            userEmail: email,
        };
        await postJobDescriptions(payload);
        if (trainBotData) {
            let entry: TrainBotEntryType = {
                entryId: jobDescriptionId,
                type: "linkedin.jobDescription",
                input: inputPrompt,
                output: "out",
                idealOutput: "",
                status: "pending",
                userEmail: email,
                fileAddress: "",
                Instructions: `Write Job Descriptions for ${personName} at different companies`,
            };
            await makeTrainedBotEntry(entry);
            return NextResponse.json(
                { success: true },
                { status: 200 }
            );
        }
    } catch (err) {
        return NextResponse.json(
            { result: "something went wrong", success: false },
            { status: 404 }
        );
    }
}