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
import Link from "next/link";
import { leftArrowIcon } from "@/helpers/iconsProvider";
import Button from "@/components/utilities/form-elements/Button";

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
        const response = await res.json();
        console.log(
          "first response: " + response.result,
          typeof response.result
        );

        dispatch(setUserData(response.result));
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
        education: userData?.education,
        email: userData?.email,
        experience: userData?.experience,
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        phone: userData?.phone,
        skills: userData?.skills,
      });
    }
  }, [userData]);
  return (
    <>
      <div className="my-5 ml-10 pt-30">
        <Link
          href="/dashboard"
          className="flex flex-row gap-2 items-center hover:font-semibold transition-all"
        >
          {leftArrowIcon}
          Dashboard
        </Link>
      </div>
      <div className="flex m-10 mt-2 gap-4">
        <div className="w-full flex flex-col p-4  border border-gray-200 rounded-lg shadow sm:p-6  ">
          <h2 className="text-2xl mr-10 mb-6">LinkedIn PDF Generator</h2>

          <div className="flex flex-row gap-4">
            <div>
              <Button
                type="button"
                disabled={
                  msgLoading || !session?.user?.email || !aiInputUserData
                }
                onClick={() => handleGenerate()}
                className="btn theme-outline-btn"
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
              </Button>
            </div>
            <ReactToPrint
              trigger={() => (
                <Button
                  type="button"
                  disabled={!show || msgLoading || !session?.user?.email}
                  className="btn theme-outline-btn"
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
                </Button>
              )}
              content={() => componentRef.current}
            />
          </div>
          {/* <div className="">Download PDF</div> */}
        </div>
      </div>
      {show && (
        <div
          className={`w-[95%]  bg-white text-gray-800 border border-gray-200 rounded-lg shadow  m-10 ${
            msgLoading ? "animate-pulse" : ""
          }`}
        >
          <div className="p-12" ref={componentRef}>
            <div className="flex flex-col gap-4 ">
              <h1 className="text-4xl font-semibold">
                {userData?.firstName + " " + userData?.lastName} LinkedIn
                Profile
              </h1>
              <h2 className="text-green-600 font-bold">Fantastic Photo:</h2>
              <p>
                After taking a look at your profile, I found that your profile
                picture is missing. Your profile picture is often the first
                thing people see when they visit your profile, and it{"'"}s an
                essential element in building a professional and trustworthy
                online presence.
              </p>
              <h2 className="text-red-600 font-bold">Missing Photo:</h2>
              <p>
                After taking a look at your profile, I must say your profile
                picture looks fantastic! It{"'"}s professional and eye-catching.
                There is no need to update it.{" "}
              </p>
              <p>
                Not having a profile picture can give the impression that your
                profile is incomplete or even fake. It can also make it
                difficult for people to connect with you and recognize you in
                real-life networking events or job interviews.
              </p>

              <h2 className="text-yellow-600 font-bold">
                Poor Quality or Casual Photo:
              </h2>
              <p>
                I noticed that you have uploaded a profile picture to your
                LinkedIn profile, and while the picture is great, I wanted to
                provide some constructive feedback. As you know, LinkedIn is a
                professional networking site, and your profile picture plays an
                important role in creating a professional and trustworthy image.
              </p>
              <p>
                Currently, your profile picture doesn{"'"}t quite align with
                this goal. I would like to suggest that you consider updating it
                to a more suitable photo, such as a professional headshot. A
                high-quality headshot can help you make a great first impression
                on potential connections and employers, and showcase your
                professionalism and attention to detail.
              </p>
              <p>
                Please don{"'"}t take this feedback personally, I just want to
                help you make the most of your LinkedIn profile and increase
                your chances of success in your professional network. Let me
                know if you need any help or guidance in selecting a new profile
                picture
              </p>
              <h2 className="text-2xl font-semibold mt-10">
                Cover/Background:
              </h2>
              <h2 className="text-green-600 font-bold">Customized Cover:</h2>
              <p>
                Your cover design looks great and really enhances your profile.
                It{"'"}s clear that you understand the importance of this
                premium space on your profile and have made the effort to make a
                great impression on those who visit it. Keep up the great work!
              </p>
              <h2 className="text-red-600 font-bold">
                LinkedIn Default Cover:
              </h2>
              <p>
                I noticed that your cover photo is the default LinkedIn banner.
                As you know, the cover photo is one of the most prominent parts
                of your profile and can greatly impact how you come across to
                potential employers and connections.
              </p>
              <p>
                I would like to suggest that you consider replacing your cover
                photo with a custom design. A custom LinkedIn cover design can
                help you stand out and make a great impression on those who
                visit your profile. It{"'"}s a premium space that you don{"'"}t
                want to waste.
              </p>
              <p>
                By updating your cover photo, you will be able to show off your
                unique personality and skills, and increase your chances of
                being noticed by recruiters and potential employers. This is a
                small change that can make a big difference in the way people
                perceive you and your profile
              </p>
              <p>
                We have designed a custom LinkedIn cover for you that includes
                your email and contact number. This approach safeguards your
                contact information from robotic data gathering while still
                making it convenient for potential recruiters and professionals
                to reach out to you for opportunities. However, the choice to
                use this customized cover, modify the headline, or remove your
                contact details is entirely yours. We are here to accommodate
                your preferences and ensure your LinkedIn profile aligns with
                your goals
              </p>
              <p className="font-bold">
                Your new cover can be found in the email you received.
              </p>

              <h2 className="text-yellow-600 font-bold">Need Improvement:</h2>
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
              <h2 className="text-2xl font-semibold mt-10">Headline:</h2>
              <h2 className="text-green-600 font-bold">Great Headline:</h2>
              <p>
                Great job on your LinkedIn headline! I can see that you
                understand the importance of this section and have made it stand
                out by including related keywords. Your headline is not just a
                job title, but a great representation of your professional
                expertise and unique value proposition.
              </p>
              <p>
                As you may know, your headline is the first thing that people
                see on your profile, and recruiters often use it to filter
                through search results. So, it{"'"}s essential to make it
                informative and compelling to grab their attention. Keep up the
                good work!
              </p>
              <h2 className="text-yellow-600 font-bold">Need Improvements:</h2>
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
              <h2 className="text-2xl font-semibold mt-10">About Section:</h2>
              <h2 className="text-green-600 font-bold">Good About Section:</h2>
              <p>
                Great job on your profile summary! It effectively showcases your
                expertise in a professional manner. The {'"'}About{'"'} section
                of your profile is critical, as it sets the tone for the rest of
                your profile. It{"'"}s important to make it detailed yet
                concise, engaging, and use relevant industry jargon where
                appropriate.
              </p>
              <p>
                Remember, your profile summary should position yourself as the
                product you want to sell to potential employers. You{"'"}ve done
                a great job of including relevant keywords and utilizing bullet
                points to make it easy to read. Keep up the good work!
              </p>
              <hr />
              <div className="font-sans whitespace-pre-wrap break-words">
                <div dangerouslySetInnerHTML={{ __html: about }}></div>
              </div>
              <hr />
              <h2 className="text-2xl font-semibold mt-10">
                Experience Section:
              </h2>
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
              <h2 className="text-2xl font-semibold mt-10">Skills Section:</h2>
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
              <h2 className="text-2xl font-semibold mt-10">
                Recommendations Section:
              </h2>
              <h2 className="text-green-600 font-bold">
                5 or more than 5 Recommendations:
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

              <h2 className="text-red-600 font-bold">No Recommendation:</h2>
              <p>
                I noticed that there are no recommendations on your profile,
                which is a missed opportunity to showcase the great work you
                {"'"}ve done and the impact you{"'"}ve had. Don{"'"}t be shy
                about reaching out to your connections who you{"'"}ve
                collaborated with or provided value to and politely ask for a
                recommendation.
              </p>
              <p>
                Remember, it{"'"}s important to get relevant recommendations
                from people who can genuinely speak to your skills and expertise
                in a particular area. Consider reaching out to former managers,
                colleagues, or clients who can provide a comprehensive and
                authentic view of your professional abilities.
              </p>
              <p>
                Having a few well-crafted recommendations on your profile can
                make a big difference in how you{"'"}re perceived by recruiters
                and potential employers. So, don{"'"}t hesitate to ask for them
                and make sure to thank those who take the time to provide one
                for you.
              </p>

              <h2 className="text-yellow-600 font-bold">
                Less than 5 recommendations:
              </h2>
              <p>
                It{"'"}s good to have recommendations on your profile as they
                can provide valuable insight into your professional abilities
                and work ethic. It{"'"}s also an excellent way to build
                credibility and establish trust with potential employers and
                connections.
              </p>
              <p>
                One suggestion could be to try to get more recommendations from
                people in different roles or industries to showcase your
                versatility and skills across different areas. Additionally,
                consider reaching out to more recent colleagues or supervisors
                for recommendations to keep your profile up-to-date and
                relevant.
              </p>
              <p>
                Overall, having recommendations on your profile is a great
                asset, and continuing to seek them out and showcase them can
                help you stand out in a crowded job market.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ResumeCreator;
