import { ChatOpenAI } from "langchain/chat_models/openai";
import { LLMChain } from "langchain/chains";
import { NextApiHandler } from "next";
import Prompt from "@/db/schemas/Prompt";

import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import startDB from "@/lib/db";

const handler: NextApiHandler = async (req, res) => {
  try {
    const body = req.body;

    if (body) {
      const { linkedinContent, option, aboutInstructions } = body;
      let prompt;
      await startDB();
      const promptRec = await Prompt?.findOne({
        type: "linkedinTool",
        name: option,
        active: true,
      });
      prompt = promptRec ? promptRec.value : "";
      if (option === "aboutInstructions") {
        prompt = prompt.replaceAll("{{instructions}}", aboutInstructions);
      }

      if (linkedinContent) {
        const model1 = new ChatOpenAI({
          streaming: true,
          modelName: "gpt-3.5-turbo",
          callbacks: [
            {
              handleLLMNewToken(token) {
                console.log(token);
                res.write(token);
              },
            },
          ],
          temperature: 0.5,
        });

        const input = `This is the User data:
            ${linkedinContent}

            This is the prompt:
            ${prompt}`;

        const chatPrompt = ChatPromptTemplate.fromPromptMessages([
          SystemMessagePromptTemplate.fromTemplate(`You are a helpful assistant that Reads the User data of a person and helps Writing About for the person LinkedIn.
            Following are the content of the resume (in JSON format):
            JSON user/resume data: {userData}

            `),
          HumanMessagePromptTemplate.fromTemplate("{prompt}"),
        ]);
        const promptSummary = input;

        const chainC = new LLMChain({
          prompt: chatPrompt,
          llm: model1,
        });
        await chainC.call({
          userData: JSON.stringify(linkedinContent),
          prompt: promptSummary,
        });

        res.end(); // Close  the stream
      }
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: "something went wrong",
    });
  }
};
export default handler;
