"use client";
import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Metadata } from "next";
import { signIn, useSession } from "next-auth/react";
import { refreshIconRotating } from "@/helpers/iconsProvider";
import { useDispatch } from "react-redux";
import { setUploadedFileName } from "@/store/resumeSlice";
import Image from "next/image";
import pdf from "pdf-parse";

// export const metadata: Metadata = {
//   title: "CareerBooster.AI-Register",
// };

const RegistrationForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submittingError, setSubmittingError] = useState<string>("");
  const [fileUploading, setFileUploading] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);
  const [fileError, setFileError] = useState<string>("");
  const [fileData, setFileData] = useState<string>("");
  // session
  const { data, status }: { data: any; status: any } = useSession();
  const isAuth = status === "authenticated";

  // Redux
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmpassword: "",
      // status: "pending",
      terms: false,
      alertConsent: false,
      file: "",
    },

    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is Required"),
      lastName: Yup.string().required("Last Name is Required"),
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Email is Required"),
      password: Yup.string().required("Password is Required"),
      confirmpassword: Yup.string()
        .required("Enter Password again")
        .oneOf([Yup.ref("password"), "null"], "Passwords must match"),
      file: Yup.string().required("PDF Resume/CV is Required"),
    }),

    onSubmit: async (values) => {
      setSubmittingError("");

      if (values.terms) {
        setSubmitting(true);

        const obj = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          file: values.file,
          status: false,
          alertConsent: values.alertConsent,
        };

        // Create user account in database
        axios
          .post("/api/auth/users", obj)
          .then(async function (response) {
            if (values.file !== "") {
              await UpdateGohighlevel(obj);
              await moveResumeToUserFolder(values.file, values.email);
              await updateUser(values.file, values.email);
            }
            const res = await signIn("credentials", {
              email: values.email,
              password: values.password,
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

  const moveResumeToUserFolder = async (fileName: string, email: string) => {
    if (fileName && email) {
      const obj = {
        fileName: fileName,
        email: email,
      };
      return axios.post(`/api/users/moveResumeToUserFolder`, obj);
    }
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
            const uploadedFileName = res.fileName + ".pdf";
            dispatch(setUploadedFileName(uploadedFileName));
            fetchRegistrationDataFromResume(uploadedFileName);
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
            // router.replace(
            //   `/register?firstName=${userData.firstName}&lastName=${userData.lastName}&email=${userData.email}&file=${fileName}`
            // );

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

            formik.setFieldValue("file", fileName);
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
    const fileInput = e.target;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const uploadedFile = fileInput.files[0];

      if (uploadedFile.type !== "application/pdf") {
        setFileError("Only PDF files are allowed");
        return;
      }

      setFile(uploadedFile);
      setFileError("");

      // Use pdf-parse to extract text from the PDF file
      const reader = new FileReader();
      reader.onload = async (event: any) => {
        const buffer = event.target.result;
        if (buffer) {
          const data = Buffer.from(new Uint8Array(buffer));
          const pdfData = await pdf(data);
          const text = pdfData.text;
          console.log("pdf text: " + text);
          // Update your component state with the extracted text
          setFileData(text);

          // Optionally, you can use the extracted text as needed.
          // For example, you can send it to the server or process it further.
          // fetchRegistrationDataFromResume(uploadedFile.name, text);
        }
      };

      reader.readAsArrayBuffer(uploadedFile);
    }
  };

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
    if (file && file.type === "application/pdf") {
      //  file exists and is PDF
      setFileError("");
      // upload it to server
      //uploadFileToServer();
      // getContentFromResume(file);
    } else if (file) {
      // if file exists but not PDf
      setFileError("only PDF file is allowed");
    }
  }, [file]);

  return (
    <div className="col-lg-12" data-aos="fade-up-sm" data-aos-delay="100">
      <div className="account-wrapper d-flex flex-column justify-center">
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
          <h3 className="pb-4">Register your Account</h3>

          <form className="vstack gap-4" onSubmit={formik.handleSubmit}>
            <div className={`upload-resume-btn mt-5 mb-10`}>
              {!params?.get("file") && (
                <>
                  {!isAuth && data === null && (
                    <label
                      className="btn btn-lg btn-gradient-1 aos-init aos-animate"
                      data-aos="fade-up-sm"
                      data-aos-delay="200"
                    >
                      <input
                        className="hidden"
                        type="file"
                        disabled={fileUploading}
                        onChange={(e) => {
                          handleFileChange(e);
                        }}
                      />
                      {/* {fileUploading
                        ? refreshIconRotating
                        : "Upload Your Existing Resume"} */}
                      Upload Your Existing Resume
                    </label>
                  )}
                  <p className="text-gray-700 mt-4 text-sm">
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
            <div className="text-start mb-4">
              <div className="input-group with-icon">
                <span className="icon">
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
                  className="form-control rounded-2 py-4"
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
            <div className="text-start my-4">
              <div className="input-group with-icon ">
                <span className="icon">
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
                  className="form-control rounded-2 py-4"
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
            <div className="text-start my-4">
              <div className="input-group with-icon">
                <span className="icon">
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
                  className="form-control rounded-2 py-4"
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
            <div className="text-start my-4">
              <div className="input-group with-icon">
                <span className="icon">
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
                <input
                  type="password"
                  name="password"
                  className="form-control rounded-2 py-4"
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
            </div>
            <div className="text-start my-4">
              <div className="input-group with-icon">
                <span className="icon">
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
                <input
                  type="password"
                  name="confirmpassword"
                  className="form-control rounded-2 py-4"
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
            </div>
            <div className="text-start my-4">
              <div className="ml-3 text-sm">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  onChange={formik.handleChange}
                  checked={formik.values.terms ? true : false}
                  className="w-4 mr-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
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
                  className="w-4 mr-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
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
                className="btn theme-btn w-full py-4"
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

            <div className="text-center">
              <p>
                Already have an account?
                <Link href="/login" className="text-decoration-none">
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
