"use client";
import { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import StepOne from "@/components/welcome/StepOne";
import StepTwo from "@/components/welcome/StepTwo";
import StepThree from "@/components/welcome/StepThree";
import StepFour from "@/components/welcome/StepFour";
import StepFive from "@/components/welcome/StepFive";
import StepSix from "@/components/welcome/StepSix";
import ProfileReview from "@/components/welcome/profileReview";

const Welcome = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submittingError, setSubmittingError] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Email is Required"),
      password: Yup.string().required("Password is Required"),
    }),
    onSubmit: async (values) => {
      setSubmitting(true);
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false, // prevent default redirect
      });
      setSubmitting(false);
      if (res?.error) return setSubmittingError(res.error);
      router.replace("/dashboard");
    },
  });
  return (
    <section className="bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 py-20 !pb-60">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {/* <StepOne /> */}
            {/* <StepTwo /> */}
            {/* <StepThree /> */}
            {/* <StepFour /> */}
            {/* <StepFive /> */}
            {/* <StepSix /> */}
            <ProfileReview />

            <button
              type="button"
              className="w-full flex flex-row justify-center items-center gap-2 bg-gray-900 text-white hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              <span>Next</span>
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
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
