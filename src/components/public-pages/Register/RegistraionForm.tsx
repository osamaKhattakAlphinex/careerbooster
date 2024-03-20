"use client";
import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Metadata } from "next";
import { signIn, useSession } from "next-auth/react";
import { refreshIconRotating, uploadIcon } from "@/helpers/iconsProvider";
import { useDispatch } from "react-redux";
import { setUploadedFileName } from "@/store/resumeSlice";
import Image from "next/image";
import FileUploadHandler from "@/components/dashboard/FileUploadHandler";
import { makeid } from "@/helpers/makeid";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import WordFileHandler from "@/components/dashboard/WordFileHandler";

// export const metadata: Metadata = {
//   title: "CareerBooster.AI-Register",
// };

function removeSpecialChars(str: string) {
  // Remove new lines
  str = str.replace(/[\r\n]+/gm, "");

  // Remove Unicode characters
  str = str.replace(/[^\x00-\x7F]/g, "");

  // Remove icons
  str = str.replace(/[^\w\s]/gi, "");

  return str;
}
const RegistrationForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submittingError, setSubmittingError] = useState<string>("");
  const [fileUploading, setFileUploading] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileError, setFileError] = useState<string>("");
  const [text, setText] = useState<string>("");
  // session
  const { data, status }: { data: any; status: any } = useSession();
  const isAuth = status === "authenticated";

  const content = params?.get("content");

  // Redux
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      // password: "",
      // confirmpassword: "",
      // status: "pending",
      terms: true,
      alertConsent: true,
      file: "",
    },

    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is Required"),
      lastName: Yup.string().required("Last Name is Required"),
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Email is Required"),
      // password: Yup.string().required("Password is Required"),
      // confirmpassword: Yup.string()
      //   .required("Enter Password again")
      //   .oneOf([Yup.ref("password"), "null"], "Passwords must match"),
      // file: Yup.string().required("PDF Resume/CV is Required"),
    }),

    onSubmit: async (values) => {
      setSubmittingError("");

      if (text === "") {
        setSubmittingError("Error Reading Resume");
      } else if (values.terms) {
        setSubmitting(true);

        const obj = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          // password: values.password,

          uploadedResume: {
            id: makeid(),
            fileName: fileName,
            fileContent: text,
            uploadedDateTime: new Date(),
          },

          status: true,
          alertConsent: values.alertConsent,
        };
        // Create user account in database
        axios
          .post("/api/auth/users", obj)
          .then(async function (response) {
            if (values.file !== "") {
              await UpdateGohighlevel(obj);
              // await moveResumeToUserFolder(values.file, values.email);
              await updateUser(values.file, values.email);
            }

            // TODO REMOVE CONTENT FROM LOCAL STOARGE

            const res = await signIn("credentials", {
              email: values.email,
              otp: 0o000000,
              redirect: false, // prevent default redirect
            });

            if (res?.error) {
              setSubmitting(false);
              return setSubmittingError(res.error);
            }
            router.replace("/dashboard");
          })
          .catch(function (error) {
            if (error.response.data.error) {
              setSubmittingError(error.response.data.error);
            } else {
              setSubmittingError("Something went wrong");
            }
          })
          .finally(() => {
            setSubmitting(false);
          });
      }
    },
  });

  const UpdateGohighlevel = async (obj: any) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_GHL_API_URL}/contacts/`,
        {
          name: obj?.firstName + obj?.lastName,
          firstName: obj?.firstName,
          lastName: obj?.lastName,
          email: obj?.email,
          tags: ["cb-user"],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GHL_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateUser = (file: string, email: string) => {
    if (file && email) {
      return axios.post("/api/users/updateUser", {
        newFile: file,
        email: email,
      });
    }
  };

  const removeDashesFromString = (str: string) => {
    return str.replace(/-/g, " ");
  };

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

            if (userData.firstName || userData.lastName || userData.email) {
              formik.setFieldValue(
                "firstName",
                removeDashesFromString(userData.firstName)
              );
              formik.setFieldValue(
                "lastName",
                removeDashesFromString(userData.lastName)
              );
              formik.setFieldValue(
                "email",
                removeDashesFromString(userData.email)
              );
            }
            // dispatch(setUploadedFileName(userData.files));
            // formik.setFieldValue("file", fileName);
          } else {
            setFileError("Something went wrong");
          }
        })
        .catch((error) => {
          setFileError("Something went wrong");
        })
        .finally(() => {
          setFileUploading(false);
        });
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fileInput = e.target;

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      setFile(fileInput.files[0]);
      setFileName(fileInput.files[0].name);
    }
  };

  // useEffect(() => {
  //   const data: any = localStorage.getItem("pdfText");
  //   console.log("first text in registration form", data.pdfText);
  //   //  if (data) {
  //   //    dispatch(setField({ name: "scrappedContent", value: data.pdfText }));
  //   //  }
  // }, [text]);
  useEffect(() => {
    const firstName = params?.get("firstName");
    const lastName = params?.get("lastName");
    const email = params?.get("email");
    const file = params?.get("file");

    if (firstName && lastName && email) {
      formik.setFieldValue("firstName", removeDashesFromString(firstName));
    }
    if (lastName) {
      formik.setFieldValue("lastName", removeDashesFromString(lastName));
    }
    if (email) {
      formik.setFieldValue("email", removeDashesFromString(email));
    }
    if (file) {
      formik.setFieldValue("file", file);
    }
  }, [params]);

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data: any = localStorage.getItem("pdfText");

      if (data) {
        setText(data);
      }
    }
  }, []);

  return (
    <div className="flex flex-col w-full md:w-5/12 mx-auto">
      <div className="flex flex-col justify-center">
        <div className="text-center">
          <a>
            {/* <Image
              src="/assets/images/logo.svg"
              alt=""
              className="img-fluid"
              width={165}
              height={40}
            /> */}
          </a>
          <h3 className=" font-semibold  text-lg md:text-2xl lg:text-[2rem] dark:text-gray-100 text-gray-950">
            Get Started Free: Unlock Powerful Tools for Your Career
          </h3>

          <form className="flex flex-col my-2" onSubmit={formik.handleSubmit}>
            <div className={`mb-5`}>
              {!params?.get("file") && (
                <>
                  {!isAuth && data === null && !content && (
                    <label className="flex justify-center md:my-6 ">
                      <input
                        className="hidden"
                        type="file"
                        disabled={file}
                        onChange={(e) => {
                          handleFileChange(e);
                        }}
                      />
                      {fileUploading ? (
                        <div className="flex w-fit  justify-center items-center cursor-pointer gap-2 bg-gradient-to-r from-purple-700 to-pink-500 text-white p-3 rounded-lg  mx-auto">
                          {refreshIconRotating}
                        </div>
                      ) : (
                        <div className="flex items-center w-fit cursor-pointer xs:scale-75 md:scale-100 gap-2 bg-gradient-to-r from-purple-700 to-pink-500 text-white p-4 rounded-lg text-[1.125rem] font-medium hover:bg-pink-600 hover:from-purple-800 hover:to-pink-600">
                          {uploadIcon} Upload Your Existing Resume
                        </div>
                      )}
                    </label>
                  )}
                  {file !== null && file.type === "application/pdf" ? (
                    <FileUploadHandler
                      file={file}
                      text={text}
                      setText={setText}
                      fetchRegistrationDataFromResume={
                        fetchRegistrationDataFromResume
                      }
                    />
                  ) : (
                    file !== null && (
                      <WordFileHandler
                        file={file}
                        text={text}
                        setText={setText}
                        fetchRegistrationDataFromResume={
                          fetchRegistrationDataFromResume
                        }
                      />
                    )
                  )}
                  <p className="dark:text-gray-100 text-gray-950 mt-2 text-sm">
                    Your existing resume forms the basis for your new one,
                    eliminating manual data entry.
                  </p>
                  {formik.touched.file && formik.errors.file && (
                    <p className="text-red-600 pt-3">
                      {formik.touched.file && formik.errors.file}
                    </p>
                  )}
                </>
              )}
            </div>
            <div className="text-start mb-2">
              <div className="flex flex-wrap relative items-stretch  w-full">
                <span className="absolute w-12 h-12 z-1000 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
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
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </span>
                {/* <label
                            htmlFor="firstName"
                            className={`block mb-2 text-sm font-medium text-gray-900  `}
                          >
                            First Name
                          </label> */}
                <input
                  type="text"
                  name="firstName"
                  className="block outline-none focus:border-blue-400 dark:bg-transparent rounded-lg pr-[1.5rem] py-4 pl-[3rem] text-base w-full border-[1px] border-[#bdbfd4] bg-transparent bg-clip"
                  placeholder="First Name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                />
              </div>
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="text-red-600 pt-3">
                  {formik.touched.firstName && formik.errors.firstName}
                </p>
              )}
            </div>
            <div className="text-start my-2">
              <div className="flex flex-wrap relative items-stretch  w-full ">
                <span className="absolute w-12 h-12 z-1000 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
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
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </span>
                {/* <label
                            htmlFor="lastName"
                            className={`block mb-2 text-sm font-medium text-gray-900  `}
                          >
                            Last Name
                          </label> */}
                <input
                  type="text"
                  name="lastName"
                  className="block outline-none focus:border-blue-400 dark:bg-transparent rounded-lg pr-[1.5rem] py-4 pl-[3rem] text-base w-full border-[1px] border-[#bdbfd4] bg-transparent bg-clip"
                  placeholder="Last Name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                />
              </div>
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="text-red-600 pt-3">
                  {formik.touched.lastName && formik.errors.lastName}
                </p>
              )}
            </div>
            <div className="text-start my-2">
              <div className="flex flex-wrap relative items-stretch  w-full">
                <span className="absolute w-12 h-12 z-1000 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
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
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </span>

                {/* <label
                            htmlFor="Emil"
                            className={`block mb-2 text-sm font-medium text-gray-900  `}
                          >
                            Enter Your Email
                          </label> */}
                <input
                  type="email"
                  name="email"
                  className="block outline-none focus:border-blue-400 dark:bg-transparent rounded-lg pr-[1.5rem] py-4 pl-[3rem] text-base w-full border-[1px] border-[#bdbfd4] bg-transparent bg-clip"
                  placeholder="Enter Your Email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-600 pt-3">
                  {formik.touched.email && formik.errors.email}
                </p>
              )}
            </div>
            {/* <div className="text-start my-2">
              <div className="flex flex-wrap relative items-stretch  w-full">
                <span className="absolute w-12 h-12 z-1000 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
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
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                </span>
                {/* <label
                            htmlFor="Emil"
                            className={`block mb-2 text-sm font-medium text-gray-900  `}
                          >
                            Enter Your Email
                          </label> */}
                {/* <input
                  type="password"
                  name="password"
                  className="block outline-none focus:border-blue-400 dark:bg-transparent rounded-lg pr-[1.5rem] py-4 pl-[3rem] text-base w-full border-[1px] border-[#bdbfd4] bg-transparent bg-clip"
                  placeholder="Enter Password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-600 pt-3">
                  {formik.touched.password && formik.errors.password}
                </p>
              )}
            </div> */}
            {/* <div className="text-start my-2">
              <div className="flex flex-wrap relative items-stretch  w-full">
                <span className="absolute w-12 h-12 z-1000 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
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
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                </span>
                {/* <label
                            htmlFor="Emil"
                            className={`block mb-2 text-sm font-medium text-gray-900  `}
                          >
                            Enter Your Email
                          </label> */}
                {/* <input
                  type="password"
                  name="confirmpassword"
                  className="block outline-none focus:border-blue-400 dark:bg-transparent rounded-lg pr-[1.5rem] py-4 pl-[3rem] text-base w-full border-[1px] border-[#bdbfd4] bg-transparent bg-clip"
                  placeholder="Confirm Password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.confirmpassword}
                />
              </div>
              {formik.touched.confirmpassword &&
                formik.errors.confirmpassword && (
                  <p className="text-red-600 pt-3">
                    {formik.touched.confirmpassword &&
                      formik.errors.confirmpassword}
                  </p>
                )} 
            </div> */}
            <div className="text-start my-4">
              <div className="ml-3 text-sm">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  onChange={formik.handleChange}
                  checked={formik.values.terms ? true : false}
                  className="w-4 mr-4 h-4 border-[1px] border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                />

                <label htmlFor="terms" className="font-light mr-1">
                  I accept the{" "}
                  <Link
                    className="font-medium text-primary-600 hover:underline "
                    href="/terms-and-conditions"
                  >
                    Terms and Conditions
                  </Link>
                </label>

                <label htmlFor="terms" className="font-light">
                  &
                  <Link
                    className="font-medium text-primary-600 ml-1 hover:underline "
                    href="/privacy-policy"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>
            <div className="text-start my-4">
              <label className="ml-3 text-sm" htmlFor="alertConsent">
                <input
                  id="alertConsent"
                  aria-describedby="alertConsent"
                  type="checkbox"
                  onChange={formik.handleChange}
                  checked={formik.values.alertConsent ? true : false}
                  className="w-4 mr-4 h-4 border-[1px] border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                />
                By checking this box, you consent to receiving SMS, Calls and
                Emails including important alerts and notifications, from
                CareerBooster.AI
              </label>
            </div>
            {submittingError !== "" && (
              <div
                className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 my-2"
                role="alert"
              >
                <p>{submittingError}</p>
              </div>
            )}
            <div className="text-center mt-4">
              <button
                type="submit"
                disabled={!formik.values.terms || submitting}
                className={`w-full py-4 rounded-md !bg-[#6a4dff]  dark:!bg-[#e6f85e] text-gray-100 dark:text-gray-950 disabled:opacity-[.65] `}
              >
                {submitting ? (
                  <span className="flex items-center justify-center">
                    {refreshIconRotating}
                  </span>
                ) : (
                  "Create an account"
                )}
              </button>
            </div>
            <div className="text-center mt-2">
              <p>
                Already have an account?
                <Link
                  href="/login"
                  className="text-[#6a4dff]  no-underline hover:underline dark:!text-[#e6f85e]"
                >
                  {" "}
                  Log in{" "}
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
