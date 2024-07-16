"use client";
import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import {
  phoneIcon,
  refreshIconRotating,
  uploadIcon,
} from "@/helpers/iconsProvider";
import FileUploadHandler from "@/components/dashboard/FileUploadHandler";
import { makeid } from "@/helpers/makeid";
import WordFileHandler from "@/components/dashboard/WordFileHandler";

const RegistrationForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submittingError, setSubmittingError] = useState<string>("");
  const [fileUploading, setFileUploading] = useState<boolean>(false);
  const [file, setFile] = useState<File>();
  const [fileName, setFileName] = useState<string>("");
  const [fileError, setFileError] = useState<string>("");
  const [text, setText] = useState<string>("");
  // session
  const { data, status }: { data: any; status: any } = useSession();
  const isAuth = status === "authenticated";

  const content = params?.get("content");
  const getProfile = params?.get("profile");
  
  // Redux

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      terms: false,
      alertConsent: false,
      file: "",
    },

    validationSchema: Yup.object({
      firstName: Yup.string().required("First name required"),
      lastName: Yup.string().required("Last name required"),
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Email address required"),
      phone: Yup.string().required("Phone number required"),
    }),

    onSubmit: async (values) => {
      setSubmittingError("");

      if (text === "") {
        setSubmittingError("Please Upload Your Resume to Continue");
      } else if (values.terms) {
        setSubmitting(true);

        const obj = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          registeredPhone: values.phone,
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
              otp: 100000,
              redirect: false, // prevent default redirect
            });

            if (res?.error) {
              setSubmitting(false);
              return setSubmittingError(res.error);
            }
            if(getProfile === "true"){
              router.replace("/profile?goToProfile=true");
            } else {
              router.replace("/dashboard");
            }
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
        .then(async (resp) => {
          const res = await resp.json();
          if (res.success) {
            let userData;
            if (typeof res.result === "object") {
              userData = res.result;
            } else {
              userData = await JSON.parse(res.result);
            }
            router.replace(
              `/register?firstName=${userData.firstName}&lastName=${userData.lastName}&email=${userData.email}&phone=${userData.registeredPhone}&content=true`
            );

            if (
              userData.firstName ||
              userData.lastName ||
              userData.email ||
              userData.registeredPhone
            ) {
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
              formik.setFieldValue(
                "phone",
                removeDashesFromString(userData.registeredPhone)
              );
            }
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

  useEffect(() => {
    const firstName = params?.get("firstName");
    const lastName = params?.get("lastName");
    const email = params?.get("email");
    const registeredPhone = params?.get("phone");
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
    if (registeredPhone) {
      formik.setFieldValue("phone", removeDashesFromString(registeredPhone));
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
    <div className="flex flex-col w-full mx-auto md:w-5/12">
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
                  {!isAuth && data === null && content !== "true" ? (
                    <label className="flex justify-center md:my-6 ">
                      <input
                        className="hidden"
                        type="file"
                        disabled={fileUploading}
                        onChange={(e) => {
                          handleFileChange(e);
                        }}
                      />
                      {fileUploading ? (
                        <div className="flex items-center justify-center gap-2 p-3 mx-auto text-white rounded-lg cursor-pointer w-fit bg-gradient-to-r from-purple-700 to-pink-500">
                          {refreshIconRotating}
                        </div>
                      ) : (
                        <div className="flex items-center whitespace-nowrap w-fit cursor-pointer xs:scale-75 md:scale-100 gap-2 bg-gradient-to-r from-purple-700 to-pink-500 text-white p-4 rounded-lg text-[1.125rem] font-medium hover:bg-pink-600 hover:from-purple-800 hover:to-pink-600">
                          {uploadIcon} Upload Your Existing Resume
                        </div>
                      )}
                    </label>
                  ) : (
                    <div className="flex items-center justify-center text-gray-400 whitespace-nowrap">
                      <div className=" w-3 h-3 p-2 mr-2 text-stone-950 !bg-[#6a4dff]  dark:!bg-[#e6f85e] rounded-full flex justify-center items-center font-extrabold lg:text-[14px] text-[12px]">
                        !
                      </div>
                      <span>
                        Important! Please verify your details before sign up
                      </span>
                    </div>
                  )}
                  {file !== null && file?.type === "application/pdf" ? (
                    <FileUploadHandler
                      file={file}
                      text={text}
                      setText={setText}
                      fetchRegistrationDataFromResume={
                        fetchRegistrationDataFromResume
                      }
                    />
                  ) : (
                    file !== null &&
                    (file?.type === "application/msword" ||
                      file?.type ===
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document") && (
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
                  <p className="mt-2 text-sm dark:text-gray-100 text-gray-950">
                    Your existing resume forms the basis for your new one,
                    eliminating manual data entry.
                  </p>
                  {formik.touched.file && formik.errors.file && (
                    <p className="pt-3 text-red-600">
                      {formik.touched.file && formik.errors.file}
                    </p>
                  )}
                </>
              )}
            </div>
            <div className="mb-2 text-start">
              <div className="relative flex flex-wrap items-stretch w-full">
                <span className="absolute flex items-center justify-center w-12 h-12 transform -translate-y-1/2 z-1000 top-1/2">
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
                <p className="pt-3 text-red-600">
                  {formik.touched.firstName && formik.errors.firstName}
                </p>
              )}
            </div>
            <div className="my-2 text-start">
              <div className="relative flex flex-wrap items-stretch w-full ">
                <span className="absolute flex items-center justify-center w-12 h-12 transform -translate-y-1/2 z-1000 top-1/2">
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
                <p className="pt-3 text-red-600">
                  {formik.touched.lastName && formik.errors.lastName}
                </p>
              )}
            </div>
            <div className="my-2 text-start">
              <div className="relative flex flex-wrap items-stretch w-full">
                <span className="absolute flex items-center justify-center w-12 h-12 transform -translate-y-1/2 z-1000 top-1/2">
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
                <p className="pt-3 text-red-600">
                  {formik.touched.email && formik.errors.email}
                </p>
              )}
            </div>
            <div className="my-2 text-start">
              <div className="relative flex flex-wrap items-stretch w-full">
                <span className="absolute flex items-center justify-center w-12 h-12 transform -translate-y-1/2 z-1000 top-1/2">
                  {phoneIcon}
                </span>

                {/* <label
                            htmlFor="Emil"
                            className={`block mb-2 text-sm font-medium text-gray-900  `}
                          >
                            Enter Your Email
                          </label> */}
                <input
                  type="tel"
                  name="phone"
                  className="block outline-none focus:border-blue-400 dark:bg-transparent rounded-lg pr-[1.5rem] py-4 pl-[3rem] text-base w-full border-[1px] border-[#bdbfd4] bg-transparent bg-clip"
                  placeholder="Enter Your Phone Number"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                />
              </div>
              {formik.touched.phone && formik.errors.phone && (
                <p className="pt-3 text-red-600">
                  {formik.touched.phone && formik.errors.phone}
                </p>
              )}
            </div>
            {/* <div className="my-2 text-start">
              <div className="relative flex flex-wrap items-stretch w-full">
                <span className="absolute flex items-center justify-center w-12 h-12 transform -translate-y-1/2 z-1000 top-1/2">
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
                <p className="pt-3 text-red-600">
                  {formik.touched.password && formik.errors.password}
                </p>
              )}
            </div> */}
            {/* <div className="my-2 text-start">
              <div className="relative flex flex-wrap items-stretch w-full">
                <span className="absolute flex items-center justify-center w-12 h-12 transform -translate-y-1/2 z-1000 top-1/2">
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
                  <p className="pt-3 text-red-600">
                    {formik.touched.confirmpassword &&
                      formik.errors.confirmpassword}
                  </p>
                )} 
            </div> */}
            <div className="my-4 text-start">
              <div className="ml-3 text-sm">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  onChange={formik.handleChange}
                  checked={formik.values.terms ? true : false}
                  className="w-4 mr-4 h-4 border-[1px] border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                />

                <label htmlFor="terms" className="mr-1 font-light">
                  I accept the{" "}
                  <Link
                    className="font-medium text-primary-600 hover:underline "
                    href="/terms-and-conditions"
                    target="_blank"
                  >
                    Terms and Conditions
                  </Link>
                </label>

                <label htmlFor="terms" className="font-light">
                  &
                  <Link
                    className="ml-1 font-medium text-primary-600 hover:underline "
                    href="/privacy-policy"
                    target="_blank"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>
            <div className="my-4 text-start">
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
                className="p-4 my-2 text-orange-700 bg-orange-100 border-l-4 border-orange-500"
                role="alert"
              >
                <p>{submittingError}</p>
              </div>
            )}
            <div className="mt-4 text-center">
              <button
                type="submit"
                disabled={!formik.values.terms || submitting}
                className={`w-full py-4 rounded-md !bg-[#6a4dff]  dark:!bg-[#e6f85e] text-gray-100 dark:text-gray-950 disabled:opacity-[.65] `}
              >
                {submitting ? (
                  <span className="flex items-center justify-center">
                    {refreshIconRotating}
                  </span>
                ) : getProfile === "true" ? (
                  "Make My Profile"
                ) : (
                  "Create an account"
                )}
              </button>
            </div>
            <div className="mt-2 text-center">
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
