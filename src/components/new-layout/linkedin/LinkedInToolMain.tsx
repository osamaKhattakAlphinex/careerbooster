"use client";
import manyImage from "@/../public/many-image.png";
import {
  ArrowDownIcon,
  refreshIconRotating,
  uploadIcon,
} from "@/helpers/iconsProvider";
import Image from "next/image";
import FAQList from "../Homepage/Faqs";
import Reviews from "../Homepage/Reviews";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FileUploadHandler from "@/components/FileUploadHandler";

const saveToLocalStorage = (text: any, fileName: any) => {
  localStorage.setItem("linkedin-content", text);
  localStorage.setItem("linkedin-fileName", fileName);
};

const LinkedInToolMain = () => {
  const router = useRouter();
  const [file, setFile] = useState<any>(null); //main page
  const [fileName, setFileName] = useState<any>(null);
  const [fileError, setFileError] = useState<string>("");
  const [fileUploading, setFileUploading] = useState<boolean>(false);
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  // const uploadFileToServer = async () => {
  //   setFileError("");
  //   setFileUploading(true);
  //   if (file) {
  //     const body = new FormData();
  //     body.append("file", file);

  //     fetch("/api/fileUpload?type=linkedin-tool", {
  //       method: "POST",
  //       body,
  //     })
  //       .then(async (resp: any) => {
  //         const res = await resp.json();
  //         if (res.success) {
  //           const uploadedFileName = res.fileName + "_" + file.name;
  //           setFileName(uploadedFileName);
  //           // linkedinHeadline(uploadedFileName);
  //           // linkedinAbout(uploadedFileName);

  //           // router.replace("/welcome?step=1");
  //           // router.replace("/register");
  //           // setSuccessMsg("File has been uploaded!");
  //         } else {
  //           setFileError("Something went wrong");
  //         }
  //       })
  //       .catch((error) => {
  //         setFileError("Something went wrong");
  //       })
  //       .finally(() => {
  //         setFileUploading(false);
  //         setUploadComplete(true);
  //       });
  //   }
  // };

  useEffect(() => {
    if (file && file.type === "application/pdf") {
      //  file exists and is PDF
      setFileError("");
      // upload it to server
      // uploadFileToServer();
    } else if (file) {
      // if file exists but not PDf
      setFileError("only PDF file is allowed");
    }
  }, [file]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fileInput = e.target;

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      setFile(fileInput.files[0]);
      setFileName(fileInput.files[0].name);
    }
  };
  useEffect(() => {
    if (file && file.type === "application/pdf") {
      setFileUploading(true);
      // router.push(`/linkedin/result`);
      setUploadComplete(true);
    }
  }, [file, fileName]);

  useEffect(() => {
    if (uploadComplete && fileUploading && text !== "") {
      saveToLocalStorage(text, fileName);
      router.push("/linkedin/result");
    }
  }, [fileUploading, uploadComplete, text]);
  return (
    <div className="w-full">
      {/* Upload File */}
      <div className="lg:px-36 text-center lg:py-8">
        <p className="text-md sm:text-sm md:text-md lg:text-lg">
          Keyword-Optimized, Captivating & Under 30 Seconds!
        </p>
        <h1 className="py-2 md:text-[40px] text-[24px] text-center lg:font-bold mt-3">
          Free{" "}
          <span className="py-2 md:text-[40px] text-[24px] font-bold bg-clip-text text-transparent bg-gradient-to-r to-violet-500 from-fuchsia-500">
            AI LinkedIn
          </span>{" "}
          Summary Generator
          <h5 className="pt-3 padding-p md:text-[40px] text-[24px] text-center lg:font-bold">
            Achieve Top Rankings in Recruiter
          </h5>
          <h5 className="md:text-[40px] text-[24px] w-full text-center lg:font-bold ">
            Searches and Secure More Interviews!
          </h5>
        </h1>
        <p className="text-md sm:text-sm md:text-md lg:text-lg">
          Simply Upload your Resume or LinkedIn Profile in PDF. Receive results
          perfectly tailored for you — or we{"'"}ll compensate you $1000 if we
          waste your time with irrelevant outcomes.
        </p>
        <div className="mt-11 flex justify-center md:mt-11">
          <label className="h-16 w-84 lg:h-16 lg:w-84 py-3 cursor-pointer px-3 md:px-6 rounded-xl bg-gradient-to-r to-violet-500 from-fuchsia-500">
            <input
              type="file"
              className="hidden "
              disabled={fileUploading}
              onChange={(e) => {
                handleFileChange(e);
              }}
            />
            {fileUploading || uploadComplete ? (
              <p className="p-2">{refreshIconRotating}</p>
            ) : (
              <div className="flex gap-2 ">
                <div>{uploadIcon}</div>
                <div className="text-center ">
                  <p className="m-0 font-semibold text-md [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
                    Upload Resume or LinkedIn in PDF
                  </p>
                  <p className="text-xs">No credit card required</p>
                </div>
              </div>
            )}
          </label>
        </div>
      </div>
      {file !== null && (
        <FileUploadHandler
          file={file}
          text={text}
          setText={setText}
          // fetchRegistrationDataFromResume={fetchRegistrationDataFromResume}
        />
      )}
      {fileError && (
        <div
          className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 my-2 !text-left w-[50%] m-auto"
          role="alert"
        >
          <p className="m-0">{fileError}</p>
        </div>
      )}
      <div
        className="mb-14 lg:mb-20 flex justify-center mt-10"
        onClick={() =>
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          })
        }
      >
        <span className="text-center lg:mt-4 py-2 text-indigo-500 border-indigo-500  rounded-t-2xl rounded-b-2xl border-1">
          {ArrowDownIcon}
        </span>
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="text-center lg:px-10 md:text-[40px] text-[24px] font-semibold leading-normal lg:mt-3">
          Why Upload a Resume or LinkedIn Profile?
        </h3>
        <h5 className="text-center leading-7 font-normal lg:text-xl ">
          Our AI scans your existing resume or LinkedIn profile to comprehend
          your career journey, previous work experiences, background, and
          targeted job position. This allows it to craft a tailormade,
          keyword-optimized summary and LinkedIn headline perfectly suited for
          you.
        </h5>
      </div>
      {/*Vide  Card */}
      <div className="md:flex mt-20">
        <div className="md:my-2 lg:m-0 md:w-6/12 lg:w-6/12">
          <h3 className="md:text-[40px] text-[24px] text font-semibold">
            I don{"'"}t have a resume. How can I upload my LinkedIn profile in
            PDF format?
          </h3>
          <div className="flex">
            <div className="w-[10%] -mx-1 lg:-mx-5 pt-11 h-full flex flex-col items-center  gap-1">
              {/* dot */}
              <div className="w-6 h-6 rounded-full bg-gradient-to-t to-fuchsia-500 from-violet-500 border-4 border-gray-800"></div>
              {/* line */}
              <div className="h-11 md:h-3 w-[2px] bg-fuchsia-500"></div>
              {/* dot */}
              <div className="w-6 h-6 rounded-full bg-gradient-to-t to-fuchsia-500 from-violet-500 border-4 border-gray-800"></div>
              {/* line */}
              <div className="h-19 lg:h-10 w-[2px] bg-fuchsia-500"></div>
              {/* dot */}
              <div className="w-6 h-6 rounded-full bg-gradient-to-t to-fuchsia-500 from-violet-500 border-4 border-gray-800"></div>
            </div>
            <div className="w-[90%]  h-full pt-10">
              <ul className="text-lg text-gray-200 flex flex-col gap-0 ">
                <li>Click here to navigate to your LinkedIn profile.</li>
                <li className=" bullet-1">
                  On your profile page, click on the ellipsis (three dots) and
                  select {"'"}Save to PDF{"'"}
                </li>
                <li className="bullet-2">
                  This will allow you to download and save your LinkedIn profile
                  as a PDF document.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="md:w-6/12 flex md:items-center lg:m-0 lg:w-6/12">
          <div className="h-64 md:h-64 lg:h-96 w-full flex justify-center items-center rounded-xl border-1 bg-gradient-to-r from-fuchsia-500 to-violet-500  border-gray-800 ">
            Video
          </div>
        </div>
      </div>
      {/* Card */}
      <div className="w-full md:8/12 lg:h-[550px] lg:flex rounded-2xl mt-14 bg-gradient-to-r from-fuchsia-500 to-violet-500  border-gray-800">
        <div className="text lg:w-6/12 lg:my-8 lg:mx-14  md:text-left">
          <h3 className="py-6 px-3 md:text-[40px] text-[24px] text-normal font-bold  lg:mr-4 lg:mt-3">
            Challenge us, prove us wrong, and earn a $1000 reward!
          </h3>
          <p className="px-2 text-xl font-normal lg:mt-12 tracking-normal ">
            We take immense pride in the accuracy and relevance of our AI tool,
            which consistently delivers results that our users adore. Yet, if
            you pinpoint a discrepancy and show that our tool produced content
            that{"'"}s either generic or entirely unrelated to your profile, we
            recognize the misstep and will reward you with $1000 for your time.
            Our goal isn{"'"}t merely to meet expectations but to surpass them,
            guaranteeing your complete satisfaction.
          </p>
        </div>
        <div className="lg:w-6/12 md:flex md:justify-center mx-5 md:mx-5">
          <Image src={manyImage} alt="Not Found" />
        </div>
      </div>
      <div className="mt-10 lg:mt-20 px-8">
        <h3 className="text-center md:text-[40px] text-[24px] lg:px-10 pb-1 text-gray-100 font-semibold leading-normal mt-3">
          Game-Changer for LinkedIn Job Seekers!{" "}
        </h3>
        <p className="text-xl  font-normal text-center text-gray-300 lg:px-5">
          Most professionals miss out on valuable opportunities due to
          non-optimized profiles, lacking the vital keywords and engaging
          content that recruiters actively seek.
        </p>
        <h3 className="text-center pt-1 lg:px-10 md:text-[40px] text-[24px] text-gray-100 font-semibold leading-normal mt-10 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
          Why is keyword optimization crucial?{" "}
        </h3>
        <p className="text-xl  font-normal text-center text-gray-300 lg:px-5">
          Recruiters often use LinkedIn{"'"}s search engine to find potential
          candidates. If your profile isn{"'"}t optimized with relevant keywords
          for your industry and role, you{"'"}re likely to be left out of these
          searches, no matter how qualified you might be.
        </p>
        <h3 className="text-center pt-1 lg:px-10  text-3xl text-gray-100 font-semibold leading-normal mt-10 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
          Personalized to Perfection{" "}
        </h3>
        <p className="text-xl  font-normal text-center text-gray-300 lg:px-5">
          CareerBooster.AI doesn{"'"}t just sprinkle random keywords onto your
          profile. Our advanced AI technology dives deep into your resume or
          LinkedIn PDF to understand your career trajectory, aspirations, and
          strengths. This ensures that the generated content isn{"'"}t just
          keyword-rich but also aligns perfectly with your professional
          narrative.
        </p>
        <h3 className="text-center pt-1 lg:px-10  text-3xl text-gray-100 font-semibold leading-normal mt-10 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
          Speedy and Effortless Transformation{" "}
        </h3>
        <p className="text-xl  font-normal text-center text-gray-300 lg:px-5">
          We understand the value of time. Hence, our tool is designed to
          overhaul your LinkedIn summary and headline in under 30 seconds,
          offering you an instantaneous upgrade.
        </p>
        <h5 className="text-center w-full font-normal text-2xl">
          Keyword-Optimized, Captivating & Under 30 Seconds!
        </h5>
        <h3 className="text-center lg:px-16 lg:leading-relaxed lg:text-5xl font-bold  lg:mt-10">
          Don{"'"}t let your LinkedIn profile be just another face in the crowd.
          Use{" "}
          <span className="lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r to-violet-500 from-fuchsia-500">
            CareerBooster.AI
          </span>{" "}
          and ensure you stand out, get noticed, and advance in your career
          journey.
        </h3>
      </div>
      <div className="sm:-mt-4">
        <FAQList />
      </div>
      <div className="-mx-4">
        <Reviews />
      </div>

      <div className="w-full mb-3 lg:h-80 flex flex-col justify-center items-center rounded-2xl mt-14 bg-gradient-to-r to-fuchsia-600 from-indigo-500  border-gray-800">
        <div className="lg:w-10/12 flex justify-center items-center flex-col my-4">
          <h3 className="text-4xl text-normal text-center font-bold mt-3">
            Free AI LinkedIn Summary Generator
          </h3>
          <p className="text-1xl text-normal text-center mt-4">
            Simply Upload your Resume or LinkedIn Profile in PDF
          </p>
          <button
            className="bg-yellow-400 mt-4 h-14 w-56 text-center rounded-full font-bold text-xl text-black py-3 px-9"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkedInToolMain;
