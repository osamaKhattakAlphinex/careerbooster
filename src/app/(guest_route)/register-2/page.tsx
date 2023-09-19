"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "CareerBooster.Ai-Register",
};
const RegisterNew = () => {
  const router = useRouter();
  const params = useSearchParams();

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submittingError, setSubmittingError] = useState<string>("");

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
        };

        axios
          .post("/api/auth/users", obj)
          .then(async function (response) {
            if (values.file !== "") {
              await moveResumeToUserFolder(values.file, values.email);
              await updateUser(values.file, values.email);
            }
            router.replace("/login");
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

  const removeDashesFromString = (str: string) => {
    return str.replace(/-/g, " ");
  };

  return (
    <div className="wrapper d-flex flex-column justify-between">
      <main className="flex-grow-1">
        <section className="account-section login-page py-6 h-full">
          <div className="container-fluid h-full">
            <div className="row h-full">
              <div
                className="col-lg-6 d-none d-lg-block"
                data-aos="fade-up-sm"
                data-aos-delay="50"
              >
                <div className="bg-dark-blue-4 border rounded-4 h-full p-6 p-md-20 text-center d-flex flex-column justify-center">
                  <h2 className="text-white mb-12">
                    Unlock the Power of <br className="d-none d-xl-block" />
                    <span className="text-primary-dark">GenAI</span> Copywriting
                    Tool
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
                <div className="close-btn">
                  <a
                    href="index.html"
                    className="icon bg-gradient-3 text-white w-12 h-12 rounded p-3 border border-white border-opacity-10 d-flex align-center justify-center ms-auto"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <g
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      >
                        <path d="M18 6 6 18M6 6l12 12" />
                      </g>
                    </svg>
                  </a>
                </div>
                <div className="account-wrapper h-full d-flex flex-column justify-center">
                  <div className="text-center">
                    <a href="">
                      <img
                        src="assets/images/logo.svg"
                        alt=""
                        className="img-fluid"
                        width="165"
                      />
                    </a>
                    <div className="vstack gap-4 mt-10">
                      <button type="button" className="btn account-btn py-4">
                        <img
                          src="assets/images/icons/google.svg"
                          alt=""
                          width="24"
                          className="img-fluid icon"
                        />
                        <span>Continue With Google</span>
                      </button>
                      <button type="button" className="btn account-btn py-4">
                        <img
                          src="assets/images/icons/apple.svg"
                          alt=""
                          width="24"
                          className="img-fluid icon"
                        />
                        <span>Continue With Apple</span>
                      </button>
                    </div>

                    <div className="divider-with-text my-10">
                      <span>Or register with email</span>
                    </div>

                    <form action="#" className="vstack gap-4">
                      <div className="text-start">
                        <div className="input-group with-icon">
                          <span className="icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <g
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.2"
                              >
                                <path d="M2.25 5.25a1.5 1.5 0 0 1 1.5-1.5h10.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5H3.75a1.5 1.5 0 0 1-1.5-1.5v-7.5Z" />
                                <path d="M2.25 5.25 9 9.75l6.75-4.5" />
                              </g>
                            </svg>
                          </span>
                          <input
                            type="email"
                            className="form-control rounded-2 py-4"
                            placeholder="Enter Your Email"
                          />
                        </div>
                      </div>
                      <div className="text-start">
                        <div className="input-group with-icon">
                          <span className="icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              viewBox="0 0 24 24"
                            >
                              <path stroke="none" d="M0 0h24v24H0z" />
                              <path d="M12 3a12 12 0 0 0 8.5 3A12 12 0 0 1 12 21 12 12 0 0 1 3.5 6 12 12 0 0 0 12 3" />
                              <circle cx="12" cy="11" r="1" />
                              <path d="M12 12v2.5" />
                            </svg>
                          </span>
                          <input
                            type="password"
                            className="form-control rounded-2 py-4"
                            placeholder="Password"
                          />
                        </div>
                      </div>
                      <div className="text-start">
                        <div className="input-group with-icon">
                          <span className="icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              viewBox="0 0 24 24"
                            >
                              <path stroke="none" d="M0 0h24v24H0z" />
                              <path d="M12 3a12 12 0 0 0 8.5 3A12 12 0 0 1 12 21 12 12 0 0 1 3.5 6 12 12 0 0 0 12 3" />
                              <circle cx="12" cy="11" r="1" />
                              <path d="M12 12v2.5" />
                            </svg>
                          </span>
                          <input
                            type="password"
                            className="form-control rounded-2 py-4"
                            placeholder="Confirm Password"
                          />
                        </div>
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-primary-dark w-full py-4"
                        >
                          Create an account
                        </button>
                      </div>
                      <div className="text-center">
                        <p>
                          Already have an account?
                          <a href="login.html" className="text-decoration-none">
                            {" "}
                            Log in{" "}
                          </a>
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
