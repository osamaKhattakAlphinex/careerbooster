import { NextApiHandler } from "next";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import Prompt from "@/db/schemas/Prompt";
import TrainBot from "@/db/schemas/TrainBot";

const handler: NextApiHandler = async (req, res) => {
  try {
    const reqBody = JSON.parse(req.body);
    const experience = reqBody.experience;
    const trainBotData = reqBody.trainBotData;

    const promptRec = await Prompt.findOne({
      type: "linkedin",
      name: "jobDescription",
      active: true,
    });
    const prompt = promptRec.value;

    // CREATING MODAL
    const model = new ChatOpenAI({
      streaming: true,
      modelName: "gpt-3.5-turbo",
      callbacks: [
        {
          handleLLMNewToken(token) {
            res.write(token);
          },
        },
      ],
      temperature: 0.5,
    });

    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate(`You are a helpful assistant that helps Writing Individual Job Description for a person for his Resume.
      The Resume Data is as follows:
      Job Title: {jobTitle}
      Company Name: {company}
      From Month: {fromMonth}
      From Year: {fromYear}
      To Month: {toMonth}
      To Year: {toYear}
      is the job continued: {isContinue}
      Job Description: {description}
      Company country: {country}
      Company city,State: {cityState}
      `),
      HumanMessagePromptTemplate.fromTemplate("{prompt}"),
    ]);
    const chainB = new LLMChain({
      prompt: chatPrompt,
      llm: model,
    });

    const resp = await chainB.call({
      jobTitle: experience.jobTitle,
      company: experience.company,
      fromMonth: experience.fromMonth,
      fromYear: experience.fromYear,
      toMonth: experience.toMonth,
      toYear: experience.toYear,
      isContinue: experience.isContinue ? "yes" : "no",
      description: experience.description,
      country: experience.country,
      cityState: experience.cityState,
      prompt,
    });

    // make a trainBot entry
    const obj = {
      type: "linkedin.generateJD",
      input: prompt,
      output: resp.text.replace(/(\r\n|\n|\r)/gm, ""),
      idealOutput: "",
      status: "pending",
      userEmail: trainBotData.userEmail,
      fileAddress: trainBotData.fileAddress,
      Instructions: `LinkedIn Job Description for [${experience.jobTitle}] at [${experience.company}]`,
    };

    await TrainBot.create({ ...obj });

    res.end();
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
export default handler;
