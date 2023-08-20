"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const initialPrompt = `
I want you to read my resume data that you already have and 
    rewrite each job experience Based on the following instructions:

    - Write a 2-3 sentences description for each role. 
    - designation line should be bold
    - company name line should be italic
    - Add 3-5 bullet points for each role and use this formula when writing bullets for each role: success verb + noun + metric + outcome.
      ''''
      Here is the example format that I want you to follow for each role:

      Vice President, Chief Privacy Officer, Associate General Counsel
      BARNES & NOBLE EDUCATION, INC., Basking Ridge, NJ Jan 2016 - Present

      
      > Barnes & Noble Education, spun off in 2015 as a publicly traded company from the neighborhood bookstore
      chain, is one of the largest contract operators of institutional bookstores, managing over 1,200 stores
      serving six million students delivering educational content, products, services and emblematic merchandise.

      
      > Advise senior leadership, the board of directors and other internal clients on worldwide privacy law matters,
      including GDPR and CCPA, as amended, related SEC and other regulatory matters, incident response, data
      retention, risk mitigation, marketing and advertising
      > Design, implement, iterate and improve an enterprise-wide data privacy compliance program, including drafting
      internal policies and external notices, to help mitigate risk and ensure the protection of personal information and
      company confidential information from unauthorized access or processing
      > Draft, review and negotiate commercial agreements, including data processing agreements, purchase
      agreements (as seller and as buyer), strategic partnerships, master service agreements, licensing agreements,
      SaaS and other technology transactions to help enable the company's digital transformation
      > Partner with the CIO and the CISO, demonstrating increasing levels of responsibility and autonomy with three
      promotions in the first four years with the company, reporting directly to the CLO


      ----------
      The response MUST be valid HTML CODE e.g. use <b></b> around the line where you want it to be bold etc
    `;
interface Props {
  setJobDesc: React.Dispatch<React.SetStateAction<string>>;
}
const JDGenerator = ({ setJobDesc }: Props) => {
  const [msgLoading, setMsgLoading] = useState<boolean>(false); // msg loading
  const { data: session, status } = useSession();
  const [prompt, setPrompt] = useState<string>(initialPrompt);
  const [streamedData, setStreamedData] = useState("");

  useEffect(() => {
    setJobDesc(streamedData);
  }, [streamedData]);

  const handleGenerate = () => {
    setStreamedData("");
    if (session?.user?.email) {
      setMsgLoading(true);
      const formData = {
        email: session?.user?.email,
        prompt,
      };
      fetch("/api/linkedInBots/jdGenerator", {
        method: "POST",
        body: JSON.stringify(formData),
      })
        .then(async (resp: any) => {
          if (resp.ok) {
            // const res = await resp.json();
            // setStreamedData(res.result.output_text);
            const reader = resp.body.getReader();
            while (true) {
              const { done, value } = await reader.read();

              if (done) {
                break;
              }

              const text = new TextDecoder().decode(value);
              setStreamedData((prev) => prev + text);
            }
          } else {
            setStreamedData("Error! Something went wrong");
          }
          setMsgLoading(false);
        })
        .catch((error) => {
          console.log("Error encountered");
        })
        .finally(() => {
          setMsgLoading(false);
        });
    }
  };

  return (
    <div className="w-full card">
      <div className="space-y-4 md:space-y-6">
        <h2 className="text-2xl">Job Description Generator</h2>
        <textarea
          name="prompt"
          value={prompt}
          className="w-full border border-black p-2 rounded"
          rows={10}
          onChange={(e) => setPrompt(e.target.value)}
        ></textarea>
        <div className="flex flex-row gap-4">
          <div>
            <button
              disabled={msgLoading || !session?.user?.email}
              onClick={() => handleGenerate()}
              className="bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:bg-emerald-300"
            >
              <div className="flex flex-row gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={`w-4 h-4 ${msgLoading ? "animate-spin" : ""}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
                <span>{msgLoading ? "Please wait..." : "Generate About"}</span>
              </div>
            </button>
          </div>
        </div>
        {streamedData && (
          <div className="m-4 bg-gray-200 rounded border p-4">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                AI Response{" "}
              </span>
            </h1>
            <div
              className="font-sans whitespace-pre-wrap break-words"
              // style={{ textW: "auto" }}
            >
              <div
                className="list-disc"
                dangerouslySetInnerHTML={{ __html: streamedData }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default JDGenerator;
