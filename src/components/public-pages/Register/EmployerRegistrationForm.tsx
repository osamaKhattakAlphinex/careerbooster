"use client";
import { refreshIconRotating } from "@/helpers/iconsProvider";
import axios from "axios";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as Yup from "yup";

export const EmployerRegistrationForm = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submittingError, setSubmittingError] = useState<string>("");
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
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      terms: false,
      alertConsent: false,
    },

    validationSchema: Yup.object({
      firstName: Yup.string().required("First name required"),
      lastName: Yup.string().required("Last name required"),
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Email address required"),
      company: Yup.string().required("Organization name required"),
    }),

    onSubmit: async (values) => {
      setSubmittingError("");

      setSubmitting(true);

      const obj = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        company: values.company,
        status: true,
        role: "employer",
        alertConsent: values.alertConsent,
      };
      // Create user account in database
      axios
        .post("/api/auth/users", obj)
        .then(async function (response) {
          await UpdateGohighlevel(obj);
          // await moveResumeToUserFolder(values.file, values.email);

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
    },
  });

  return (
    <div className="flex flex-col w-full mx-auto md:w-5/12">
      <div className="flex flex-col justify-center">
        <div className="text-center">
          <h3 className=" font-semibold  text-lg my-4 md:text-2xl lg:text-[2rem] dark:text-gray-100 text-gray-950">
            Discover Top Talent: Find Your Perfect Match with Our Advanced
            Hiring Tools
          </h3>

          <form className="flex flex-col my-2" onSubmit={formik.handleSubmit}>
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
                      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                    />
                  </svg>
                </span>

                <input
                  type="text"
                  name="company"
                  className="block outline-none focus:border-blue-400 dark:bg-transparent rounded-lg pr-[1.5rem] py-4 pl-[3rem] text-base w-full border-[1px] border-[#bdbfd4] bg-transparent bg-clip"
                  placeholder="Organization Name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.company}
                />
              </div>
              {formik.touched.company && formik.errors.company && (
                <p className="pt-3 text-red-600">
                  {formik.touched.company && formik.errors.company}
                </p>
              )}
            </div>

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
                ) : (
                  "Create employer's account"
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
