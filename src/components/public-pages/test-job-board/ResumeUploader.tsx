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
  const userData = useSelector((state: RootState) => state.userData);
  const [fileError, setFileError] = useState<string>("");
  const [fileUploading, setFileUploading] = useState<boolean>(false);
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);
  const [registerationData, setRegisterationData] = useState<boolean>(false);
  const [uploadCompleteText, setUploadCompleteText] = useState<string>("");
  const [text, setText] = useState<string>("");
  const router = useRouter();
  const fetchRegistrationDataFromResume = async () => {
    setRegisterationData(true);
    if (userData._id) {
      router.push(`/profile/${userData._id}`);
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
        </>
      )}
      {fileUploading && <JobBoardBot />}
    </>
  );
};

export default ResumeUploader;
