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
    const userData = reqBody.userData;
    const trainBotData = reqBody.trainBotData;

    // fetch prompt from db
    const promptRec = await Prompt.findOne({
      type: "linkedin",
      name: "about",
      active: true,
    });
    const prompt = promptRec.value;

    // CREATING LLM MODAL
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
      temperature: 1,
    });

    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate(`You are a helpful assistant that Reads the Resume data of a person and helps Writing About Section for the person LinkedIn Profile.
        Following are the content of the resume (in JSON format): 
        JSON user/resume data: {userData}
        `),
      HumanMessagePromptTemplate.fromTemplate("{prompt}"),
    ]);
    const chainB = new LLMChain({
      prompt: chatPrompt,
      llm: model,
    });

    const resp = await chainB.call({
      userData: JSON.stringify(userData),
      prompt,
    });

    // make a trainBot entry
    const obj = {
      type: "linkedin.generateAbout",
      input: prompt,
      output: resp.text.replace(/(\r\n|\n|\r)/gm, ""),
      idealOutput: "",
      status: "pending",
      userEmail: trainBotData.userEmail,
      fileAddress: trainBotData.fileAddress,
      Instructions: `Generate LinkedIn About for ${trainBotData.userEmail}`,
    };

    await TrainBot.create({ ...obj });

    res.end();
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
export default handler;
