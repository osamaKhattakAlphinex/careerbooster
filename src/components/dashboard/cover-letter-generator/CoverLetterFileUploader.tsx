"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { deleteIcon } from "@/helpers/iconsProvider";
import { useSelector } from "react-redux";
import FileUploadHandler from "@/components/dashboard/FileUploadHandler";
import { makeid } from "@/helpers/makeid";
import WordFileHandler from "../WordFileHandler";
import FileUploader, { UploaderConfig } from "@/components/fileUploaderZone";
import DeleteConfirmationModal from "@/components/common/ConfirmationModal";
import { showSuccessToast } from "@/helpers/toast";

interface Props {
  selectedFile: string;
  setSelectedFile: React.Dispatch<React.SetStateAction<string>>;
}
const CoverLetterFileUploader = ({ selectedFile, setSelectedFile }: Props) => {
  //   const router = useRouter();
  // local states
  const [file, setFile] = useState<File>(); // file to upload
  const [fileName, setFileName] = useState<string>(""); // file to upload
  const [fileError, setFileError] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [loadingFiles, setLoadingFiles] = useState<boolean>(false);
  const [newFileText, setNewFileText] = useState<string>("");
  const [fileList, setFileList] = useState([]);
  const [confirmationModal, setConfirmationModal] = useState(false);
  // session
  const { data }: { data: any } = useSession();

  // redux
  const userData = useSelector((state: any) => state.userData);
  const creditLimits = useSelector((state: any) => state.creditLimits);

  const uploadFilesToDb = async (newText: string) => {
    const userEmail = userData.email;
    const file = {
      id: makeid(),
      fileName: fileName, //fileName,
      fileContent: newText,
      uploadedDateTime: new Date(),
    };

    await fetch("/api/users/updateUser", {
      method: "POST",
      body: JSON.stringify({
        newFile: file,
        email: userEmail,

        creditsUsed: creditLimits.pdf_files_upload,
      }),
    }).then(async (response) => {
      if (response.ok) {
        setNewFileText("");
      }
    });
    fetchFiles();
  };

  const fetchFiles = async () => {
    if (data?.user?.email && !loadingFiles) {
      setLoadingFiles(true);

      // Fetch the list of files from the API route
      fetch(`/api/coverLetterBot/listFiles?email=${data.user.email}`)
        .then(async (response: any) => {
          const res = await response.json();
          if (res.result) {
            setFileList(res.result);
          }
        })
        .catch((error) => {
          console.error("Error fetching file list:", error);
        })
        .finally(() => {
          setLoadingFiles(false);
        });
    }
  };

  const handleDelete = async (file: string) => {
    // const c = confirm("Are you sure you want to delete this File?");
    // if (c) {
    try {
      const response: any = await fetch(
        `/api/coverLetterBot/deleteFile?email=${data.user.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fileName: file }),
        }
      );
      const responseData = await response.json();
      if (responseData.success) {
        showSuccessToast("File has been deleted");

        setConfirmationModal(false);
        fetchFiles();
      } else {
        alert("Error deleting file: " + responseData.error);
      }
    } catch (error) {
      alert("Error deleting file: " + error);
    }
    // }
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
      // upload it to server
    } else if (file) {
      // if file exists but not PDf
      setFileError("only PDF and Word Doc file is allowed");
    }
  }, [file]);

  useEffect(() => {
    if (newFileText !== "") {
      uploadFilesToDb(newFileText);
      fetchFiles();
    }
  }, [newFileText]);
  useEffect(() => {
    fetchFiles();
  }, []);


  const uploaderConfig: UploaderConfig = {
    file: file,
    setFile: setFile,
    fileName: fileName,
    setFileName: setFileName,
  };
  const handleOpenConfirmationModal = () => {
    setConfirmationModal(true);
  };
  return (
    <>
      <div className="rounded-lg">
        <FileUploader {...uploaderConfig} />

        {/* <div className="">
          <div className="py-[12px] lg:w-[480px] px-[10px] flex  lg:flex-row flex-wrap gap-4 border-2 rounded-[10px]  border-[#312E37] border-dashed	">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="xs:w-[20] md:w-[40px] xs:h-[20px] md:h-[40px] text-[#B324D7] font-normal"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>

            <div className="flex flex-col gap-[3px]">
              <h2 className="dark:text-gray-100 text-gray-950 xs:text-[10px] md:text-[12px] font-semibold">
                Drag and drop file here
              </h2>
              <p className="dark:text-[#7a7681] xs:text-[9px] md:text-[14px]">
                Limit 20mb per file
              </p>
            </div>
            <label
              className={` cursor-pointer flex flex-row justify-center items-center h-fit py-1.5  px-[20px] border-[1px]  border-[#312E37] rounded-full ml-auto ${
                fileUploading && "!bg-black"
              }`}
            >
              <span className=" dark:text-gray-100 text-gray-950 xs:text-[10px] md:text-[12px] font-semibold">
                {fileUploading ? "Uploading..." : "Browse Files"}
              </span>
              <input
                type="file"
                className="hidden"
                disabled={fileUploading}
                onChange={(e) => {
                  if (e.target.files) {
                    setFile(e.target.files[0]);
                    setFileName(e.target.files[0]?.name);
                  }
                }}
              />
            </label>
          </div>
        </div> */}

        {file !== null && file?.type === "application/pdf" ? (
          <FileUploadHandler
            file={file}
            text={newFileText}
            setText={setNewFileText}
          />
        ) : (
          file !== null && (
            <WordFileHandler
              file={file}
              text={newFileText}
              setText={setNewFileText}
            />
          )
        )}

        {loadingFiles ? (
          <p className="dark:text-gray-100 xs:text-[10px] mt-[10px] md:text-sm text-gray-950/80">
            Loading Files...
          </p>
        ) : (
          <div className="flex flex-col xs:gap-2 md:gap-4 mt-[10px]">
            <span className="xs:text-[10px] md:text-sm text-[#615DFF] uppercase font-bold">
              Uploaded Files
            </span>
            <ul className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
              {fileList &&
                fileList.map((file: string, i: number) => (
                  <>
                    <li
                      key={i}
                      className="flex gap-0 md:gap-3 justify-between mt-2 items-center border-[1.2px] border-[#312E37] rounded-md sm:px-4 sm:py-3 p-2"
                    >
                      <label
                        className="flex flex-row items-center w-11/12 gap-2 text-xs cursor-pointer md:text-sm dark:text-gray-100 text-gray-950"
                        htmlFor={`file_${i}`}
                      >
                        <input
                          id={`file_${i}`}
                          type="radio"
                          value={file}
                          checked={
                            selectedFile && selectedFile === file ? true : false
                          }
                          name="selectedFile"
                          onChange={(e) => {
                            setSelectedFile(e.target.value);
                          }}
                          className="h-4 bg-transparent accent-[#B324D7] border-[1px]"
                        />
                        <span className="w-full truncate">{file}</span>
                      </label>
                      <button
                        type="button"
                        className="flex flex-row items-center justify-center w-1/12"
                        onClick={handleOpenConfirmationModal}
                      >
                        {deleteIcon}
                      </button>
                    </li>
                    {confirmationModal && (
                      <DeleteConfirmationModal
                        message="Are you sure you want to delete ?"
                        onConfirm={() => handleDelete(file)}
                        onCancel={() => setConfirmationModal(false)}
                      />
                    )}
                  </>
                ))}
              {fileList.length === 0 && (
                <p className="xs:text-[10px] md:text-[14px]">No Files found</p>
              )}
            </ul>
          </div>
        )}
      </div>

      {fileError && (
        <div
          className="p-4 my-2 text-orange-700 bg-orange-100 border-l-4 border-orange-500"
          role="alert"
        >
          <p className="font-bold">Error</p>
          <p>{fileError}</p>
        </div>
      )}
      {successMsg && (
        <div
          className="p-4 my-2 text-green-700 bg-green-100 border-l-4 border-green-500"
          role="alert"
        >
          <p className="font-bold">Success</p>
          <p>{successMsg}</p>
          <button type="button" onClick={() => setSuccessMsg("")}>
            [x]
          </button>
        </div>
      )}
      {/* Upload PDF Card */}
    </>
  );
};

export default CoverLetterFileUploader;
