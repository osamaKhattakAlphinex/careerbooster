"use client";
import { useEffect, useState } from "react";
// import { slugify } from "@/helpers/slugify";
import { useRouter } from "next/navigation";
import { refreshIconRotating, uploadIcon } from "@/helpers/iconsProvider";
import Button from "./utilities/form-elements/Button";

const LinkedInUploadPDFResume = () => {
  const router = useRouter();
  // local states
  const [msgLoading, setMsgLoading] = useState<boolean>(false); // msg loading
  const [aboutMsgLoading, setAboutMsgLoading] = useState<boolean>(false); // msg loading for about section
  const [headlineMsgLoading, setHeadlineMsgLoading] = useState<boolean>(false); // msg loading for Headline  section
  const [fileUploading, setFileUploading] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);
  const [fileName, setFileName] = useState<any>(null);
  const [fileError, setFileError] = useState<string>("");
  const [streamedHeadlineData, setStreamedHeadlineData] = useState("");
  const [streamedAboutData, setStreamedAboutData] = useState("");

  // Define state variables to track API call statuses
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);
  const [headlineComplete, setHeadlineComplete] = useState<boolean>(false);
  const [aboutComplete, setAboutComplete] = useState<boolean>(false);

  const uploadFileToServer = async () => {
    setFileError("");
    setFileUploading(true);
    setMsgLoading(true);
    if (file) {
      const body = new FormData();
      body.append("file", file);

      fetch("/api/fileUpload?type=linkedin-tool", {
        method: "POST",
        body,
      })
        .then(async (resp: any) => {
          const res = await resp.json();
          if (res.success) {
            const uploadedFileName = res.fileName + "_" + file.name;
            setFileName(uploadedFileName);
            linkedinHeadline(uploadedFileName);
            linkedinAbout(uploadedFileName);

            // router.replace("/welcome?step=1");
            // router.replace("/register");
            // setSuccessMsg("File has been uploaded!");
          } else {
            setFileError("Something went wrong");
          }
        })
        .catch((error) => {
          setFileError("Something went wrong");
        })
        .finally(() => {
          setFileUploading(false);
          setMsgLoading(false);
          setUploadComplete(true);
        });
    }
  };

  const linkedinHeadline = async (fileName: string) => {
    setStreamedHeadlineData("");
    setFileError("");
    setHeadlineMsgLoading(true);
    if (fileName) {
      fetch("/api/linkedInBots/linkedinHeadlineGenerator", {
        method: "POST",
        body: JSON.stringify({ fileName }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (resp: any) => {
          const res = await resp.json();
          if (res.data) {
            setStreamedHeadlineData(res.data);
          } else {
            setFileError("Something went wrong");
          }
        })
        .catch((error) => {
          setFileError("Something went wrong");
        })
        .finally(() => {
          setHeadlineMsgLoading(false);
          setHeadlineComplete(true);
        });
    } else if (!fileName) {
      setFileError("PDF Resume / CV is Required");
    }
  };

  const linkedinAbout = async (fileName: string) => {
    setStreamedAboutData("");
    setFileError("");
    setAboutMsgLoading(true);

    if (fileName) {
      fetch("/api/linkedInBots/linkedinAboutGenerator", {
        method: "POST",
        body: JSON.stringify({ fileName }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (resp: any) => {
          const res = await resp.json();
          if (res.data && res.success) {
            setStreamedAboutData(res.data);
          } else {
            setFileError("Something went wrong");
          }
        })
        .catch((error) => {
          setFileError("Something went wrong");
        })
        .finally(() => {
          setAboutMsgLoading(false);
          setAboutComplete(true);
        });
    } else if (!fileName) {
      setFileError("PDF Resume / CV is Required");
    }
  };

  //Save User in DB
  const linkedinToolSaveUser = async (fileName: string) => {
    setFileError("");
    if (fileName) {
      fetch("/api/linkedInBots/LinkedinToolEntries", {
        method: "POST",
        body: JSON.stringify({ fileName }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (resp: any) => {
          const res = await resp.json();
        })
        .catch((error) => {
          setFileError("Something went wrong");
        })
        .finally(() => {
          setMsgLoading(false);
        });
    } else if (!fileName) {
      setFileError("PDF Resume / CV is Required");
    }
  };

  useEffect(() => {
    if (file && file.type === "application/pdf") {
      //  file exists and is PDF
      setFileError("");
      // upload it to server
      uploadFileToServer();
    } else if (file) {
      // if file exists but not PDf
      setFileError("only PDF file is allowed");
    }
  }, [file]);
  useEffect(() => {
    if (uploadComplete && headlineComplete && aboutComplete) {
      // All APIs have completed, call linkedinToolSaveUser
      linkedinToolSaveUser(fileName);
    }
  }, [uploadComplete, headlineComplete, aboutComplete, fileName]);
  return (
    <>
      <label
        className="btn btn-lg  btn-gradient-1"
        data-aos="fade-up-sm"
        data-aos-delay="200"
      >
        <input
          type="file"
          className="hidden"
          disabled={fileUploading}
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
        />
        {headlineMsgLoading || aboutMsgLoading ? (
          refreshIconRotating
        ) : (
          <div className="flex gap-2 ">
            <div>{uploadIcon}</div>
            <div>
              <p className="m-0 text-sm [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
                Upload PDF Resume
              </p>
            </div>
          </div>
        )}
      </label>
      {fileError && (
        <div
          className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 my-2 !text-left w-[50%] m-auto"
          role="alert"
        >
          <p className="m-0">{fileError}</p>
        </div>
      )}

      {streamedHeadlineData || streamedAboutData ? (
        <div className=" my-3 w-full flex flex-col border border-gray-200 rounded-lg shadow sm:p-6 ">
          {headlineMsgLoading ? (
            <div className="flex justify-center py-6 items-center">
              {refreshIconRotating}
            </div>
          ) : (
            <>
              <div className="rounded p-4 border border-gray-200 ">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                    LinkedIn Headline
                  </span>
                </h1>
                <div className="font-sans whitespace-pre-wrap break-words">
                  {streamedHeadlineData}
                </div>
              </div>
              {streamedHeadlineData && (
                <Button
                  type="button"
                  className="btn mt-3 w-3/12 theme-outline-btn"
                  onClick={() => linkedinHeadline(fileName)}
                >
                  <div className="flex flex-row gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className={`w-4 h-4 ${
                        headlineMsgLoading ? "animate-spin" : ""
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                    <span>Regenerate Headline </span>
                  </div>
                </Button>
              )}
            </>
          )}
          {aboutMsgLoading ? (
            <div className="flex justify-center py-6 items-center">
              {refreshIconRotating}
            </div>
          ) : (
            <>
              <div className="rounded p-4 mt-3 border border-gray-200">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                    LinkedIn About
                  </span>
                </h1>
                <div className="font-sans whitespace-pre-wrap break-words">
                  {streamedAboutData}
                </div>
              </div>
              {streamedAboutData && (
                <Button
                  type="button"
                  className="btn mt-3 w-3/12 theme-outline-btn"
                  onClick={() => linkedinAbout(fileName)}
                >
                  <div className="flex flex-row gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className={`w-4 h-4 ${
                        aboutMsgLoading ? "animate-spin" : ""
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                    <span>Regenerate About </span>
                  </div>
                </Button>
              )}
            </>
          )}
        </div>
      ) : (
        " "
      )}

      {/* <Button
        type="button"
        className="btn mt-3 theme-outline-btn"
        onClick={() => linkedinToolSaveUser(fileName)}
      >
        Testing Api
      </Button> */}
    </>
  );
};

export default LinkedInUploadPDFResume;
