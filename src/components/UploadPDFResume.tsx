"use client";
import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
// import { slugify } from "@/helpers/slugify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { refreshIconRotating, uploadIcon } from "@/helpers/iconsProvider";
import FileUploadHandler from "./dashboard/FileUploadHandler";
import WordFileHandler from "./dashboard/WordFileHandler";

const UploadPDFResume = () => {
  const router = useRouter();
  // local states
  const [fileUploading, setFileUploading] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);
  const [fileError, setFileError] = useState<string>("");
  const [text, setText] = useState("");
  // session
  const { data, status }: { data: any; status: any } = useSession();
  const isAuth = status === "authenticated";

  const fetchRegistrationDataFromResume = async (content: string) => {
    setFileError("");
    setFileUploading(true);
    if (content) {
      fetch("/api/homepage/fetchRegistrationDataForHomepage", {
        method: "POST",
        body: JSON.stringify({ content }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (resp: any) => {
          const res = await resp.json();
          if (res.success) {
            let userData;
            if (typeof res.result === "object") {
              userData = res.result;
            } else {
              userData = await JSON.parse(res.result);
            }
            router.replace(
              `/register?firstName=${userData.firstName}&lastName=${userData.lastName}&email=${userData.email}&content=true`
            );
          } else {
            setFileError("Something went wrong");
          }
        })
        .catch((error) => {
          setFileError("Something went wrong");
        });
    }
  };

  // check file is correct
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
    } else if (file) {
      // if file exists but not PDf
      setFileError("only PDF and Word Doc file is allowed");
    }
  }, [file]);

  return (
    <>
      {!isAuth && data === null && (
        <label className=" ">
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
          {fileUploading ? (
            refreshIconRotating
          ) : (
            <div className="flex justify-center items-center gap-2 bg-gradient-to-r from-purple-700 to-pink-500 text-white p-4 rounded-lg lg:w-[33%] sm:w-[50%] md:w-[50%] xs:w-full mx-auto">
              <div>{uploadIcon}</div>
              <div>
                <p className="m-0 text-sm [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] capitalize text-center">
                  Upload Your Existing Resume
                </p>
                <p className="text-[10px] text-gray-300 m-0 capitalize text-center">
                  To eliminate manual data entry
                </p>
              </div>
            </div>
          )}
        </label>
      )}
      {file !== null && file.type === "application/pdf" ? (
        <FileUploadHandler
          file={file}
          text={text}
          setText={setText}
          fetchRegistrationDataFromResume={fetchRegistrationDataFromResume}
        />
      ) : (
        file !== null && (
          <WordFileHandler
            file={file}
            text={text}
            setText={setText}
            fetchRegistrationDataFromResume={fetchRegistrationDataFromResume}
          />
        )
      )}

      {isAuth && (
        <Link
          href="/dashboard"
          className="bg-gradient-to-r  from-purple-700  to-pink-500 text-white px-[2rem] py-[1rem] text-lg font-semibold rounded-xl "
        >
          Dashboard
        </Link>
      )}

      {fileError && (
        <div
          className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 my-2 !text-left w-[50%] m-auto"
          role="alert"
        >
          <p className="m-0">{fileError}</p>
        </div>
      )}
    </>
  );
};

export default UploadPDFResume;
