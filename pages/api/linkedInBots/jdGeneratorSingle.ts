import { NextApiHandler } from "next";
import { OpenAI } from "langchain/llms/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";

const handler: NextApiHandler = async (req, res) => {
  const reqBody = JSON.parse(req.body);
  const experience = reqBody.experience;

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

  // We can also construct an LLMChain from a ChatPromptTemplate and a chat model.
  // const chat = new ChatOpenAI({ temperature: 0 });
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

  await chainB.call({
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
    prompt: `I want you to Write a 2-3 sentences description  based on the provided data for for the current role Keep in mind the following isntructions:
    '''
      the answer should not be longer than 60 words
      Donot use the name of the person or the word "I" in the answer
      The answer should be from the third person perspective
      '''

      After you write the short description:
      Add 3-5 bullet points for this role and use this formula when writing bullets, formula: success verb + noun + metric + outcome.
      just give me the answer donot add any extra labels
      `,
  });
  // return res.status(200).json({ test });

  res.end();
  try {
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
export default handler;
