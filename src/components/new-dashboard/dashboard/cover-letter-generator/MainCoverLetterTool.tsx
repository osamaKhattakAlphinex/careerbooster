"use client";
import Image from "next/image";
import { useState } from "react";

export default function MainCoverLetterTool() {
  const [uploadPdfFile, setUploadPdfFile] = useState<string>("useYourPersona");
  return (
    <>
      <div className=" bg-[#17151B] rounded-[20px]  px-[30px] py-[41px] flex flex-col gap-5 ">
        {/* header */}
        <div className="flex flex-row justify-between items-center">
          <h3 className=" text-sm uppercase text-white font-bold">
            Generate Cover Letter
          </h3>
          <div className=" text-sm text-white uppercase font-bold">
            Available Credits:
            <span className="text-[#B324D7]"> 1 out of 1</span>
          </div>
        </div>

        {/* option */}

        <div className="text-sm text-[#615DFF] self-start">
          {/* <button
                className="flex flex-row justify-start items-center gap-[10px]"
                type="button"
                onClick={() => setShowInstruction(!showInstruction)}
              > */}
          <span className="uppercase font-bold block gro">select options</span>
        </div>

        <div className="flex flex-col gap-5 lg:px-0 px-8">
          <label
            htmlFor="default-radio-1"
            className="flex gap-3 items-center rounded-full border-[1px] border-[#615DFF] lg:px-6 lg:py-3 py-3 cursor-pointer lg:text-[15px] text-[11px] text-white w-[400px]"
          >
            <input
              style={{
                color: "#B324D7",
                background: "#B324D7",
                border: "1px solid #B324D7",
              }}
              id="default-radio-1"
              type="radio"
              value="profile"
              name="default-radio"
              onChange={(e) => {
                setUploadPdfFile(e.target.value);
              }}
              className="w-5 h-4"
            />
            Use My Persona to write the Cover Letter
          </label>
          <label
            htmlFor="default-radio-1"
            className="flex gap-3 items-center rounded-full border-[1px] border-[#353672] lg:px-6 lg:py-3 py-3 cursor-pointer lg:text-[15px] text-[11px] text-white w-[290px]"
          >
            <input
              id="default-radio-1"
              type="radio"
              value="uploadYourResume"
              onChange={(e) => {
                setUploadPdfFile("uploadYourResume");
              }}
              name="default-radio"
              className="w-4 h-4 border-[1px]"
            />
            Upload a new PDF Resume
          </label>
          {uploadPdfFile == "uploadYourResume" ? (
            <div className="py-3">
              <div className=" text-sm text-white uppercase ">
                File uploads available :
                <span className="text-[#B324D7] font-bold"> 2 out of 3</span>
              </div>
              <div className="py-[20px] w-[480px] px-[30px] flex gap-4 border-2 rounded-[10px] mt-4 border-[#312E37] border-dashed	">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-[40px] h-[40px] text-[#B324D7] font-normal"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
                <div className="flex flex-col gap-[3px]">
                  <h2 className="text-white text-[16px] font-semibold">
                    Drag and drop file here
                  </h2>
                  <p className="text-[#312E37] text-[14px]">
                    Limit 200mb per file
                  </p>
                </div>
                <button
                  type="submit"
                  className="flex flex-row justify-center items-center gap-2 py-3 px-[28px] border  border-[#312E37] rounded-full ml-auto"
                >
                  <span className="text-white text-[15px] font-semibold">
                    Browse Files
                  </span>
                </button>
              </div>
              <div className="flex flex-col gap-4 mt-[30px]">
                <span className="text-sm text-[#615DFF] uppercase font-bold">
                  or Choose File to use
                </span>
                <label
                  htmlFor="default-radio-1"
                  className="flex gap-3 items-center rounded-full border-[1px] border-[#353672] lg:px-6 lg:py-3 py-3 cursor-pointer lg:text-[15px] text-[11px] text-white w-[200px]"
                >
                  <input
                    id="default-radio-1"
                    type="radio"
                    value="Example.pdf"
                    name="default-radio"
                    className="w-4 h-4 bg-transparent border-[1px]"
                  />
                  Example.pdf
                </label>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        {/* form */}
        <form className="flex flex-col gap-5 justify-between items-start">
          <div className="w-full flex flex-col">
            <label
              htmlFor="job-title"
              className=" font-bold text-[23px] text-white flex py-[20px] gap-[3px]"
            >
              Paste Your Job Description
              <span className="text-[#F04248] text-[19px]">*</span>
            </label>
            <textarea
              id="job-title"
              name="jobTitle"
              rows={6}
              placeholder="Copy the job description for the position you are applying and paste it here to generate a tailor cover letter."
              className="w-full  px-[26px] rounded-[8px] text-sm text-[#959595] bg-transparent border-[#312E37] border pt-3"
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-[#B324D7]  to-[#615DFF] flex flex-row justify-center items-center gap-2 py-3 px-[28px]  rounded-full"
          >
            <Image
              src="/icon/u_bolt-alt.svg"
              alt="bold icon"
              height={18}
              width={18}
            />
            <span className="text-white text-[15px] font-semibold">
              Generate Cover Letter
            </span>
          </button>
        </form>

        <div className="mt-[40px] ">
          <h1 className="uppercase text-white font-bold text-[18px] pb-5">
            your ai generated cover letter
          </h1>
          <div className="aigeneratedcoverletter flex flex-col gap-4 border-[#312E37] border rounded-[8px] p-[30px]">
            <h2 className="text-white font-bold text-[22px]">
              Job Bid as a Consultant
            </h2>
            <h3 className="text-white text-[16px]">
              Dear [Hiring Manager's Name],
            </h3>
            <p className="text-white text-[16px]  leading-[30px]">
              I am writing to express my interest in the Consultant position at
              your company, as advertised in the job description. With my
              extensive background and expertise in [relevant field], I believe
              I am well-suited to provide valuable insights and strategies to
              support your organization's goals.
            </p>
            <p className="text-white text-[16px]  leading-[30px]">
              Using my proven track record in [specific area of expertise], I
              have successfully assisted numerous clients in achieving their
              objectives and driving business growth. I have a deep
              understanding of [industry/sector], enabling me to quickly
              identify opportunities and develop effective solutions. Drawing on
              my strong analytical skills, I am capable of analyzing complex
              data sets and providing actionable recommendations.
              <br />
              <br />
            </p>
            <p className="text-white text-[16px]  leading-[30px]">
              Thank you for considering my application. I am eager to discuss my
              qualifications further and explore ways in which I can support
              your organization's success. Please find attached my resume for
              your review. <br />
              <br />
            </p>
            <div className="flex flex-col gap-2">
              <p className="text-white text-[16px]">Sincerely,</p>
              <p className="text-white text-[16px]">[Your Name]</p>
            </div>
          </div>
          <div className="buttons mt-5 flex gap-3">
            <button
              type="submit"
              className="flex flex-row justify-center items-center gap-2 py-3 px-[28px] border-[#B324D7] border rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-4 h-4 text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              <span className="text-white text-[15px] font-semibold">
                Generate Cover Letter
              </span>
            </button>
            <button
              type="submit"
              className="flex flex-row justify-center items-center gap-2 py-3 px-[28px] border-[#37B944] border rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-[#37B944]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>

              <span className="text-[#37B944] text-[15px] font-semibold">
                Download in PDF
              </span>
            </button>
            <button
              type="submit"
              className="flex flex-row justify-center items-center gap-2 py-3 px-[28px] border-[#312E37] border rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-4 h-4 text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                />
              </svg>

              <span className="text-white text-[15px] font-semibold">
                Copy to clipbaord
              </span>
            </button>
            <button
              type="submit"
              className="flex flex-row justify-center ml-auto items-center gap-2 py-3 px-3 border-[#312E37] border rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
