"use client"
import FileUploadHandler from "@/components/dashboard/FileUploadHandler";
import WordFileHandler from "@/components/dashboard/WordFileHandler";
import { refreshIconRotating, uploadIcon } from "@/helpers/iconsProvider";
import React, { ChangeEvent, useEffect, useState } from "react";
import "@/styles/ScoreRing.css";

const ResumeUploader = () => {
  const [file, setFile] = useState<any>(null);
  const [fileError, setFileError] = useState<string>("");
  const [fileUploading, setFileUploading] = useState<boolean>(false);
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);
  const [uploadCompleteText, setUploadCompleteText] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [aiResumeKeywords, setAiResumeKeywords] = useState<string[]>([]);

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
      const response = await fetch("/api/resumeScan/resumeAnalysis2", {
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
        let obj;
        if (typeof data.result === "object") {
          obj = data.result;
        } else {
          obj = await JSON.parse(data.result);
        }

        setAiResumeKeywords(obj.keywords);
        setUploadCompleteText("Resume Scanned Successfully");
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
        <label className=" py-2 lg:py-2.5 mb-4  lg:px-[40px]  px-[28px] cursor-pointer  rounded-xl bg-gradient-to-r to-violet-500 from-fuchsia-500">
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

              <span className="text-[14px] lg:text-[20px] capitalize text-gray-100 ">
                Uploading Resume...
              </span>
            </div>
          ) : (
            <div className="flex gap-2 ">
              <div className="text-gray-100">{uploadIcon}</div>
              <div className="text-center ">
                <p className="text-gray-100 m-0 font-semibold whitespace-nowrap lg:text-[20px] cursor-pointer text-[14px] lg:leading-6 leading-4[text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
                  Upload Resume to get Related Jobs
                </p>
                <p className=" text-gray-100 lg:text-[14px] text-[10px] lg:leading-4 leading-[14px] pt-2">
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
        <div
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 my-2!text-left w-[50%] m-auto"
          role="alert"
        >
          <p className="m-0">{uploadCompleteText}</p>
        </div>
      )}
      
      
    </>
  );
};

export default ResumeUploader;
