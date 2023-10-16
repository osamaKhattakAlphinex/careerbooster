"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUploadedFileName } from "@/store/resumeSlice";
import { useSession } from "next-auth/react";
// import { slugify } from "@/helpers/slugify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { refreshIconRotating } from "@/helpers/iconsProvider";

const 
UploadPDFResume = () => {
  const router = useRouter();
  // local states
  const [fileUploading, setFileUploading] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);
  const [fileError, setFileError] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");

  // session
  const { data, status }: { data: any; status: any } = useSession();
  const isAuth = status === "authenticated";

  // Redux
  const dispatch = useDispatch();

  const uploadFileToServer = async () => {
    setFileError("");
    setFileUploading(true);
    if (file) {
      const body = new FormData();
      body.append("file", file);
      fetch("/api/fileUpload", {
        method: "POST",
        body,
      })
        .then(async (resp: any) => {
          const res = await resp.json();
          if (res.success) {
            const uploadedFileName = res.fileName + "_" + file.name;
            dispatch(setUploadedFileName(uploadedFileName));
            fetchRegistrationDataFromResume(uploadedFileName);
            // router.replace("/welcome?step=1");
            // router.replace("/register");
            // setSuccessMsg("File has been uploaded!");
          } else {
            setFileError("Something went wrong");
          }
        })
        .catch((error) => {
          setFileError("Something went wrong");
        });
    }
  };

  const fetchRegistrationDataFromResume = async (fileName: string) => {
    setFileError("");
    setFileUploading(true);
    if (fileName) {
      fetch("/api/homepage/fetchRegistrationDataForHomepage", {
        method: "POST",
        body: JSON.stringify({ fileName }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (resp: any) => {
          const res = await resp.json();
          if (res.success) {
            const userData = JSON.parse(res.data);

            router.replace(
              `/register?firstName=${userData.firstName}&lastName=${userData.lastName}&email=${userData.email}&file=${fileName}`
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

  return (
    <>
      {!isAuth && data === null && (
        <label
          className="btn btn-lg btn-gradient-1"
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
          {fileUploading ? refreshIconRotating : "Upload Resume - It's Free"}
        </label>
      )}
      {isAuth && (
        <Link
          href="/dashboard"
          className="btn btn-lg btn-gradient-1"
          data-aos="fade-up-sm"
          data-aos-delay="200"
        >
          Dashboard
        </Link>
      )}

      {successMsg && (
        <div
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 my-2 !text-left w-[50%] m-auto"
          role="alert"
        >
          <p className="m-0">{successMsg}</p>
        </div>
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
