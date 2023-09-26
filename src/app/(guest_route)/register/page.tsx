"use client";
import { useEffect, useState } from "react";
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

// export const metadata: Metadata = {
//   title: "CareerBooster.Ai-Register",
// };

const RegisterNew = () => {
  const router = useRouter();
  const params = useSearchParams();

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submittingError, setSubmittingError] = useState<string>("");
  const [fileUploading, setFileUploading] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);
  const [fileError, setFileError] = useState<string>("");

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
      terms: false,
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
          userPackage: "6511982f7205dfb643a1d6a0",
          userPackageUsed: {
            resumes_generation: 0,
            keywords_generation: 0,
            headline_generation: 0,
            about_generation: 0,
            job_desc_generation: 0,
            cover_letter_generation: 0,
            pdf_files_upload: 0,
            review_resume: 0,
            consulting_bids_generation: 0,
          },
        };

        axios
          .post("/api/auth/users", obj)
          .then(async function (response) {
            if (values.file !== "") {
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
            const uploadedFileName = res.fileName + "_" + file.name;
            dispatch(setUploadedFileName(uploadedFileName));
            fetchRegistrationDataFromResume(uploadedFileName);
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
        });
    }
  };

  useEffect(() => {
    const firstName = params?.get("firstName");
    const lastName = params?.get("lastName");
    const email = params?.get("email");
    const file = params?.get("file");

    if (firstName && lastName && email) {
      formik.setFieldValue("firstName", removeDashesFromString(firstName));
      formik.setFieldValue("lastName", removeDashesFromString(lastName));
      formik.setFieldValue("email", removeDashesFromString(email));
      formik.setFieldValue("file", file);
    }
  }, [params]);

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
    <div className="wrapper d-flex flex-column justify-between min-h-[1155px]">
      <main className="flex-grow-1">
        <section className="account-section login-page py-6 h-full">
          <div className="container-fluid h-full">
            <div className="row h-full">
              <div
                className="col-lg-6 d-none d-lg-block"
                data-aos="fade-up-sm"
                data-aos-delay="50"
              >
                <div className="bg-dark-blue-4 border rounded-4  p-6 p-md-20 text-center d-flex flex-column justify-center">
                  <h2 className="text-white mb-12">
                    Unlock the Power of <br className="d-none d-xl-block" />
                    <span className="text-primary-dark">
                      Career Booster
                    </span>{" "}
                  </h2>
                  <img
                    src="assets/images/screens/screen-5.png"
                    alt=""
                    className="img-fluid w-full"
                  />
                </div>
              </div>
              <div
                className="col-lg-6"
                data-aos="fade-up-sm"
                data-aos-delay="100"
              >
                <div className="account-wrapper d-flex flex-column justify-center">
                  <div className="text-center">
                    <a href="">
                      <img
                        src="assets/images/logo.svg"
                        alt=""
                        className="img-fluid"
                        width="165"
                      />
                    </a>
                    <h3 className="pb-4">Register Your Account</h3>

                    <form
                      className="vstack gap-4"
                      onSubmit={formik.handleSubmit}
                    >
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
                                    if (e.target.files) {
                                      setFile(e.target.files[0]);
                                    }
                                  }}
                                />

                                {fileUploading
                                  ? refreshIconRotating
                                  : "Upload Resume"}
                              </label>
                            )}
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
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
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
                        {formik.touched.firstName &&
                          formik.errors.firstName && (
                            <p className="text-red-600 pt-3">
                              {formik.touched.firstName &&
                                formik.errors.firstName}
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
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
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
                        {formik.touched.firstName &&
                          formik.errors.firstName && (
                            <p className="text-red-600 pt-3">
                              {formik.touched.lastName &&
                                formik.errors.lastName}
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
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
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
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
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
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
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
                          <label htmlFor="terms" className="font-light">
                            I accept the{" "}
                            <Link
                              className="font-medium text-primary-600 hover:underline "
                              href="#"
                            >
                              Terms and Conditions
                            </Link>
                          </label>
                        </div>
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
                          className="btn btn-primary-dark w-full py-4"
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
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RegisterNew;
