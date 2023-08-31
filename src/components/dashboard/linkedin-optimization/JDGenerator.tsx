"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import {
  WorkExperience,
  setField,
  setIsLoading,
  setUserData,
} from "@/store/userDataSlice";
import axios from "axios";

interface Props {
  setJobDesc: React.Dispatch<React.SetStateAction<string>>;
}
const JDGenerator = ({ setJobDesc }: Props) => {
  // local States
  const [msgLoading, setMsgLoading] = useState<boolean>(false); // msg loading
  const { data: session, status } = useSession();
  const [streamedData, setStreamedData] = useState("");

  // Redux
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userData);

  useEffect(() => {
    setJobDesc(streamedData);
  }, [streamedData]);

  // OLD HANDLE GENERATE
  // const handleGenerate = () => {
  //   setStreamedData("");
  //   if (session?.user?.email) {
  //     setMsgLoading(true);
  //     const formData = {
  //       email: session?.user?.email,
  //     };
  //     fetch("/api/linkedInBots/jdGenerator", {
  //       method: "POST",
  //       body: JSON.stringify(formData),
  //     })
  //       .then(async (resp: any) => {
  //         if (resp.ok) {
  //           // const res = await resp.json();
  //           // setStreamedData(res.result.output_text);
  //           const reader = resp.body.getReader();
  //           while (true) {
  //             const { done, value } = await reader.read();

  //             if (done) {
  //               break;
  //             }

  //             const text = new TextDecoder().decode(value);
  //             setStreamedData((prev) => prev + text);
  //           }
  //         } else {
  //           setStreamedData("Error! Something went wrong");
  //         }
  //         setMsgLoading(false);
  //       })
  //       .catch((error) => {
  //         console.log("Error encountered");
  //       })
  //       .finally(() => {
  //         setMsgLoading(false);
  //       });
  //   }
  // };

  // NEW HANDLE GENERATE FETCHING LIST
  // const handleGenerate = () => {
  //   setStreamedData("");
  //   if (session?.user?.email) {
  //     setMsgLoading(true);
  //     fetch("/api/linkedInBots/jdGenerateList", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         email: session?.user?.email,
  //       }),
  //     }).then(async (resp: any) => {
  //       const res = await resp.json();
  //       if (res.success && res?.data) {
  //         const myJSON = JSON.parse(res.data);
  //         // await myJSON.workExperience.map(async (item: any, index: number) => {
  //         //   const { title, company, companyAddress, from, to } = item.fields;
  //         //   const formData = {
  //         //     email: session?.user?.email,
  //         //     title,
  //         //     company,
  //         //     companyAddress,
  //         //     from,
  //         //     to,
  //         //   };

  //         //   const html = `<strong>${title}</strong>
  //         //     <p>${company} - ${companyAddress}</p>
  //         //     <p>${from} - ${to}</p><br />`;
  //         //   setStreamedData((prev) => prev + html);
  //         //   await individualFetch(formData);
  //         // });

  //         await Promise.all(
  //           myJSON.workExperience.map(async (item: any, index: number) => {
  //             const { title, company, companyAddress, from, to } = item.fields;
  //             const formData = {
  //               email: session?.user?.email,
  //               title,
  //               company,
  //               companyAddress,
  //               from,
  //               to,
  //             };

  //             // Wait for the individualFetch function to complete
  //             const test = await individualFetch(formData);
  //           })
  //         );

  //         setMsgLoading(false);
  //       }
  //     });
  //   }
  // };

  // const individualFetch = async (formData: any) => {
  //   return fetch("/api/linkedInBots/individualDescription", {
  //     method: "POST",
  //     body: JSON.stringify(formData),
  //   }).then(async (resp: any) => {
  //     const res = await resp.json();
  //     const { data } = res;
  //     const html = `<br /><br /><strong>${formData.title}</strong>
  //               <p>${formData.company} - ${formData.companyAddress}</p>
  //               <p>${formData.from} - ${formData.to}</p><br />${data}`;
  //     setStreamedData((prev) => prev + html);
  //   });
  // };

  const handleGenerate = async () => {
    setStreamedData("");
    await getUserDataIfNotExists();

    if (userData.isFetched) {
      // remove ids from experiences
      const experiences = userData.experience.map((item: any) => {
        const { id, ...rest } = item;
        return rest;
      });

      for (const [index, experience] of experiences.entries()) {
        let html = "";
        html += `<h1><strong>${experience.jobTitle}</strong></h1>`;
        html += `<h2>${experience.company} | ${experience?.cityState} ${experience?.country}</h2>`;
        html += `<p style='color: #3d3d3d; margin-bottom: 10px'>${
          experience.fromMonth
        } ${experience.fromYear} to ${
          experience.isContinue
            ? "Present"
            : experience.toMonth + " " + experience.toYear
        }</p>`;
        html += `<p>`;

        setStreamedData((prev) => prev + html);
        const res: any = await fetch("/api/linkedInBots/jdGeneratorSingle", {
          method: "POST",
          body: JSON.stringify({
            experience: experience,
          }),
        });

        if (res.ok) {
          const reader = res.body.getReader();
          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              break;
            }

            const text = new TextDecoder().decode(value);
            setStreamedData((prev) => prev + text);
          }
        }

        setStreamedData((prev) => prev + `</p> <br /> `);
      }
    }
  };

  const getUserDataIfNotExists = async () => {
    if (!userData.isLoading && !userData.isFetched) {
      dispatch(setIsLoading(true));
      try {
        // Fetch userdata if not exists in Redux
        const res = await fetch(
          `/api/users/getOneByEmail?email=${session?.user?.email}`
        );
        const { user } = await res.json();
        dispatch(setUserData(user));
        dispatch(setIsLoading(false));
        dispatch(setField({ name: "isFetched", value: true }));
      } catch (err) {
        setStreamedData("Something went wrong!");
      }
    }
  };

  // when page (session) loads, fetch user data if not exists
  useEffect(() => {
    if (session?.user?.email) {
      getUserDataIfNotExists();
    }
  }, [session?.user?.email]);

  return (
    <div className="w-full card">
      <div className="space-y-4 md:space-y-6">
        <h2 className="text-2xl">Job Description Generator</h2>

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
                <span>
                  {msgLoading ? "Please wait..." : "Generate Job Description"}
                </span>
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
