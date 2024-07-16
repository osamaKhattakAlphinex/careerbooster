"use client";
import FileUploadHandler from "@/components/dashboard/FileUploadHandler";
import WordFileHandler from "@/components/dashboard/WordFileHandler";
import { refreshIconRotating, uploadIcon } from "@/helpers/iconsProvider";
import React, { ChangeEvent, useEffect, useState } from "react";
import "@/styles/ScoreRing.css";
import JobBoardBot from "./JobBoardBot";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const ResumeUploader = ({ setAiResumeKeywords, setAiResumeSuggestions }) => {
  const [file, setFile] = useState<any>(null);
  const userData = useSelector((state: RootState) => state.userData)
  const [fileError, setFileError] = useState<string>("");
  const [fileUploading, setFileUploading] = useState<boolean>(false);
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);
  const [registerationData, setRegisterationData] = useState<boolean>(false);
  const [uploadCompleteText, setUploadCompleteText] = useState<string>("");
  const [text, setText] = useState<string>("MUHAMMAD USAMA BUTT  +923415233592   ⋄   Rawalpindi, Pakistan buttusamarwp@gmail.com   ⋄   GitHub   ⋄   Portfolio   ⋄   LinkedIn  SUMMARY  I am a skilled and motivated individual with extensive experience in developing web applications using the MERN stack, with a strong focus on React and NextJs. I have a track record of delivering high-quality solutions that meet user needs and expectations. I am experienced in working in agile development environments and collaborating with cross-functional teams to ensure timely project delivery.  SKILLS Technical Skills   JavaScript, React, NextJS, Redux, TypeScript, Node.js, MongoDB, Express.js, HTML5, CSS, Tailwind CSS, Material UI, Git, OpenAI  Tools   JIRA, Asana, Trello, GitHub, VS Code  EXPERIENCE Sr. Software Engineer (MERN)   November 2023 - Present CareerBooster.AI, Islamabad - Link to Site  •   Proficiently used Next.js framework for both frontend and backend development, showcasing expertise in creating dynamic and immersive user interfaces.  •   Skilled in integrating backend systems with OpenAI’s APIs, including deploying voice models and leveraging assistant functionalities, enhancing user experiences.  •   Specialized in building rich frontend experiences and seamlessly integrating AI capabilities into projects.  Full Stack Developer   July 2023 - October 2023 Horizon Tech Services Pvt. Ltd., Islamabad  •   Utilized React and Vue.js, popular JavaScript frameworks, to create dynamic and interactive user interfaces for web applications.  •   Leveraged data visualization tools to analyze and present complex data sets on frontend web applications, providing valuable insights and aiding in data-driven decision-making processes.  Web Developer   February 2022 - March 2023 Techlancers.Inc, Rawalpindi  •   Developed and maintained custom websites and web applications for clients using modern web technologies, with a strong emphasis on React and NextJS.  •   Maintained clear and consistent communication with clients throughout the project lifecycle, used Git for version control, and worked in agile development environments using tools like JIRA, Asana, and Trello to manage projects and tasks.  •   Delivered high-quality, tested, and well-documented code that IS easy to maintain and scale, using best practices.  Frontend Developer   March 2021 - January 2022 OneSolTech , Rawalpindi  •   Designed and implemented responsive user interfaces that provide an optimal user experience on a variety of devices and screen sizes.  •   Collaborated with clients to define project requirements and goals, providing guidance and expertise to help ensure the success of their projects. INTERNSHIPS Full Stack Developer Intern   July 2022 - September 2022 Sayabi Devs, Remote  •   Collaborated with a team of developers to build a full-stack website on the MERN stack for a course provider platform, ensuring seamless functionality and user experience.  •   Worked on various assigned tasks from the employer, such as implementing user authentication and creating dynamic content pages.  PROJECTS Whimcarnator - An AI-based Sketch to Real Image Generator   October 2022 - May 2023  •   Whimcarnator allows users to draw or upload a sketch on the provided canvas, which then generates different variations of that sketch into respective photorealistic images.  •   The web application is built using NextJS/ReactJS, while the machine learning backend uses GAN/Stable Dif- fusion based on the research paper titled ”Pretraining is All You Need”.  EDUCATION BE in Software Engineering , NUST, Islamabad   2019 - 2023 CGPA: 3.59/4.00  HOBBIES  Cricket, Music, Travelling, Fitness");
  const router = useRouter();
  const fetchRegistrationDataFromResume = async () => {
    setRegisterationData(true);  
    if(userData._id){
      router.push(`/profile/${userData._id}`)
      return;
    }
    if (text) {
      fetch("/api/homepage/fetchRegistrationDataForHomepage", {
        method: "POST",
        body: JSON.stringify({ content: text }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (resp) => {
          const res = await resp.json();
          if (res.success) {
            let userData;
            if (typeof res.result === "object") {
              userData = res.result;
            } else {
              userData = await JSON.parse(res.result);
            }
            router.push(
              `/register?firstName=${userData.firstName}&lastName=${userData.lastName}&email=${userData.email}&phone=${userData.registeredPhone}&content=true&profile=true`
            );
          }
        })
        .finally(() => setRegisterationData(false));
    }
  };
  useEffect(() => {
    if (
      file &&
      (file.type === "application/pdf" ||
        file.type === "application/msword" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      //  file exists and is PDF
      setFileError("");
      setFileUploading(true);
    } else if (file) {
      // if file exists but not PDf
      setFileError("only PDF or Word file is allowed");
    }
  }, [file]);

  const handleFileChange: any = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const fileInput = e.target;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      setFile(fileInput.files[0]);
    }
  };

  const analyzeResume = async () => {
    try {
      const response = await fetch("/api/job-board/gettingSkills", {
        method: "POST",
        body: JSON.stringify({
          resume_content: text,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        const obj =
          typeof data.result === "object"
            ? data.result
            : JSON.parse(data.result);
        setAiResumeKeywords(obj.skills);
        setAiResumeSuggestions(obj.suggestions);
        setUploadCompleteText("Search Completed Successfully");
        setFileUploading(false);
        setUploadComplete(true);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (fileUploading && text !== "") {
      //   saveToLocalStorage(text);
      analyzeResume();
    }
  }, [fileUploading, uploadComplete, text]);

  return (
    <>
      <div className="linkedinPdfButton flex justify-center mt-11 md:mt-11">
        <label className=" py-2 lg:py-2.5 mb-4  lg:px-[40px]  px-[28px] cursor-pointer  rounded-xl bg-gradient-to-r hover:from-purple-800 hover:to-pink-600 from-purple-700 to-pink-500">
          <input
            type="file"
            className="hidden"
            disabled={fileUploading}
            onChange={(e) => {
              handleFileChange(e);
            }}
          />
          {/* fileUploading || uploadComplete */}
          {fileUploading ? (
            <div className="flex flex-row items-center justify-center gap-2">
              <p className="text-gray-100">{refreshIconRotating}</p>
              <span className="text-[14px] lg:text-[16px] capitalize text-gray-100 ">
                Uploading Resume...
              </span>
            </div>
          ) : (
            <div className="flex gap-2 ">
              <div className="text-gray-100">{uploadIcon}</div>
              <div className="text-center ">
                <p className="text-gray-100 m-0 font-semibold whitespace-nowrap lg:text-[16px] cursor-pointer text-[14px] lg:leading-6 leading-4[text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
                  Upload Resume to get Related Jobs
                </p>
                <p className=" text-gray-100 lg:text-[14px] text-[10px] lg:leading-3 leading-[14px] pt-2">
                  No credits required
                </p>
              </div>
            </div>
          )}
        </label>
      </div>
      {file !== null && file.type === "application/pdf" && fileUploading ? (
        <FileUploadHandler file={file} text={text} setText={setText} />
      ) : (
        file !== null &&
        fileUploading && (
          <WordFileHandler file={file} text={text} setText={setText} />
        )
      )}

      {fileError && (
        <div
          className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 my-2 !text-left w-[50%] m-auto"
          role="alert"
        >
          <p className="m-0">{fileError}</p>
        </div>
      )}

      {uploadComplete && uploadCompleteText !== "" && (
        <>
          <div
            className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 my-2 !text-left w-[50%] m-auto"
            role="alert"
          >
            <p className="m-0">{uploadCompleteText}</p>
          </div>
        </>
      )}
          <div className="my-2 flex justify-center">
            <button
              className=" py-2 lg:py-2.5 mb-4 flex gap-2 items-center lg:px-[40px]  px-[28px] cursor-pointer  rounded-xl bg-gradient-to-r hover:from-purple-800 hover:to-pink-600 from-purple-700 to-pink-500"
              onClick={fetchRegistrationDataFromResume}
            >
              {registerationData ? (
                <>
                  <p className="text-gray-100">{refreshIconRotating}</p>
                  <span className="text-[14px] lg:text-[16px] capitalize text-gray-100 ">
                    Please wait...
                  </span>
                </>
              ) : (
                <p className="text-gray-100 m-0 font-semibold whitespace-nowrap lg:text-[16px] cursor-pointer text-[14px] lg:leading-6 leading-4[text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
                  Create your CareerBooster profile
                </p>
              )}
            </button>
          </div>
      {fileUploading && <JobBoardBot />}
    </>
  );
};

export default ResumeUploader;
