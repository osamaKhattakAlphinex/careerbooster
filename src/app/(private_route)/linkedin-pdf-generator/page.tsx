"use client";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import {
  WorkExperience,
  setField,
  setIsLoading,
  setUserData,
} from "@/store/userDataSlice";
import ReactToPrint from "react-to-print";

const ResumeCreator = () => {
  const componentRef = useRef<any>(null);
  const [keywords, setKeywords] = useState<string>("");
  const [headline, setHeadline] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [jobDesc, setJobDesc] = useState<string>("");
  const [aiInputUserData, setAiInputUserData] = useState<any>();
  const [msgLoading, setMsgLoading] = useState<boolean>(false); // msg loading
  const { data: session } = useSession();
  const [show, setShow] = useState<boolean>(false);

  // Redux
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userData);

  const handleGenerate = async () => {
    setKeywords("");
    await getUserDataIfNotExists();
    if (session?.user?.email) {
      setMsgLoading(true);
      setKeywords("");
      setHeadline("");
      setAbout("");
      setJobDesc("");
      setShow(true);

      // Fetch keywords
      fetch("/api/linkedInBots/keywordsGenerator", {
        method: "POST",
        body: JSON.stringify({ userData: aiInputUserData }),
      }).then(async (resp: any) => {
        if (resp.ok) {
          const reader = resp.body.getReader();
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }
            const text = new TextDecoder().decode(value);
            setKeywords((prev) => prev + text);
          }
        } else {
          setKeywords("Error! Something went wrong");
        }
      });

      // fetch Headline
      fetch("/api/linkedInBots/headlineGenerator", {
        method: "POST",
        body: JSON.stringify({ userData: aiInputUserData }),
      }).then(async (resp: any) => {
        if (resp.ok) {
          const reader = resp.body.getReader();
          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              break;
            }

            const text = new TextDecoder().decode(value);
            setHeadline((prev) => prev + text);
          }
        } else {
          setHeadline("Error! Something went wrong");
        }
      });

      // fetch About
      fetch("/api/linkedInBots/aboutGenerator", {
        method: "POST",
        body: JSON.stringify({ userData: aiInputUserData }),
      }).then(async (resp: any) => {
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
            setAbout((prev) => prev + text);
          }
        } else {
          setAbout("Error! Something went wrong");
        }
      });

      // fetch Job Description
      if (userData.isFetched) {
        // remove ids from experiences
        const experiences = userData.experience.map((item: WorkExperience) => {
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

          setJobDesc((prev) => prev + html);
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
              setJobDesc((prev) => prev + text);
            }
          }

          setJobDesc((prev) => prev + `</p> <br /> `);
        }
        setMsgLoading(false);
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
        setKeywords("Something went wrong!");
      }
    }
  };

  // when page (session) loads, fetch user data if not exists
  useEffect(() => {
    if (session?.user?.email) {
      getUserDataIfNotExists();
    }
  }, [session?.user?.email]);

  useEffect(() => {
    if (userData && userData?.email) {
      setAiInputUserData({
        contact: userData?.contact,
        education: userData?.contact,
        email: userData?.contact,
        experience: userData?.contact,
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        phone: userData?.phone,
        skills: userData?.skills,
      });
    }
  }, [userData]);
  return (
    <>
      <div className="flex m-10 gap-4">
        <div className="w-full flex flex-col p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
          <h2 className="text-2xl mr-10">LinkedIn PDF Generator</h2>

          <div className="flex flex-row gap-4">
            <div>
              <button
                disabled={
                  msgLoading || !session?.user?.email || !aiInputUserData
                }
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
                  <span>{msgLoading ? "Please wait..." : "Generate"}</span>
                </div>
              </button>
            </div>
            <ReactToPrint
              trigger={() => (
                <button
                  disabled={!show || msgLoading || !session?.user?.email}
                  className="bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:bg-emerald-300"
                >
                  <div className="flex flex-row gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                      />
                    </svg>
                    <span>Print / Download in PDF</span>
                    {/* <span>
                            To download choose destination "save as PDF"
                          </span> */}
                  </div>
                </button>
              )}
              content={() => componentRef.current}
            />
          </div>
          {/* <div className="">Download PDF</div> */}
        </div>
      </div>
      {show && (
        <div
          className={`w-[95%]  bg-white border border-gray-200 rounded-lg shadow  m-10 ${
            msgLoading ? "animate-pulse" : ""
          }`}
        >
          <div className="p-12" ref={componentRef}>
            <div className="flex flex-col gap-4 ">
              <h1 className="text-4xl font-semibold">
                {userData?.firstName + " " + userData?.lastName} LinkedIn
                Profile
              </h1>
              <p>
                After taking a look at your profile, I must say your profile
                picture looks fantastic! It{"'"}s professional and eye-catching.
                There is no need to update it.{" "}
              </p>
              <h2 className="text-2xl font-semibold">Cover/Background:</h2>
              <p>
                Great initiative on uploading your own cover photo to your
                LinkedIn profile! It{"'"}s clear that you understand the
                potential of this premium space to make a strong impression.
              </p>
              <p>
                I{"'"}d like to recommend considering a step further with a
                custom cover design. This approach can set you apart from other
                professionals, leaving a memorable impact on profile visitors.
              </p>
              <p>
                How about considering a design that incorporates your email and
                contact number? This way, we ensure your contact information is
                shielded from robotic data gathering while remaining
                conveniently accessible for potential recruiters and
                professionals seeking collaborations.
              </p>
              <p>
                If you{"'"}re interested in this opportunity, could you please
                provide the following details?
              </p>
              <p>Your preferred color scheme</p>
              <p>Consent to include your email and contact number</p>
              <p>
                An attention-grabbing headline or value proposition statement
                you{"'"}d like to feature
              </p>
              <p>
                This information will help us create a custom cover that truly
                resonates with your professional brand.
              </p>
              <h2 className="text-2xl font-semibold">Headline:</h2>
              <p>
                Great job on your LinkedIn headline! I can see that you
                understand the importance of this section and have made it stand
                out by including related keywords. Your headline is not just a
                job title; it{"'"}s a fantastic representation of your
                professional expertise and unique value proposition.
              </p>
              <p>
                As you may know, your headline is the first thing that people
                see on your profile, and recruiters often use it to filter
                through search results. So, it{"'"}s essential to make it
                informative and compelling to grab their attention. While your
                current headline is almost perfect, you can use the following to
                make it stand out even more:
              </p>
              <p className="bg-yellow-400 p-2">{headline && headline}</p>
              <p>
                Keep up the excellent work, and I{"'"}m confident your enhanced
                headline will make a strong impression on anyone who visits your
                profile.
              </p>
              <h2 className="text-2xl font-semibold">About Section:</h2>
              <div
                className="font-sans whitespace-pre-wrap break-words"
                // style={{ textW: "auto" }}
              >
                <div dangerouslySetInnerHTML={{ __html: about }}></div>
              </div>
              <h2 className="text-2xl font-semibold">Experience Section:</h2>
              <p className="bg-yellow-400 p-2">
                Please note that while the majority of the data in your
                experience section accurately represents your professional
                journey, some of the specific statistics and metrics provided
                are based on dummy data used for illustrative purposes. We
                kindly request you to review these specific metrics and replace
                them with your actual achievements to showcase your real impact
                and accomplishments on your LinkedIn profile.
              </p>
              <div
                className="font-sans whitespace-pre-wrap break-words"
                // style={{ textW: "auto" }}
              >
                <div
                  className="list-disc"
                  dangerouslySetInnerHTML={{ __html: jobDesc }}
                ></div>
              </div>
              <h2 className="text-2xl font-semibold">Skills Section:</h2>
              <p className="bg-yellow-400 p-2">
                To optimize this section, you should pin the top three skills
                that are most important for your next job. Also, be mindful of
                the order in which you add your skills as they will appear in
                the same sequence on your profile. The first skill you want to
                display should be added first, followed by the remaining skills
                based on their relevance and importance.
              </p>
              <p className="bg-yellow-400 p-2">
                It{"'"}s important to note that only the top ten skills will be
                displayed in the top part of the Skills section. Therefore, it
                {"'"}s crucial to ensure that the first ten skills you add are
                your top skills and are relevant to your job search.
              </p>
              <div
                className="font-sans whitespace-pre-wrap break-words"
                // style={{ textW: "auto" }}
              >
                <div dangerouslySetInnerHTML={{ __html: keywords }}></div>
              </div>
              <h2 className="text-2xl font-semibold">
                Recommendations Section:
              </h2>
              <p>
                I was impressed to see that you have several recommendations on
                your profile. Many people overlook this section and miss out on
                the opportunity to showcase their skills and expertise through
                the words of others. You{"'"}ve clearly put in the effort to ask
                for and receive these recommendations, and it shows that you
                value building a strong professional network.
              </p>
              <p>
                Having recommendations on your profile can help establish your
                credibility and increase your chances of being noticed by
                recruiters and potential employers.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ResumeCreator;
