"use client";
import { useState } from "react";
import { refreshIconRotating } from "@/helpers/iconsProvider";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
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
      setSubmittingError("");
      setSubmitting(true);
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
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col justify-center gap-4"
    >
      <div className="text-start">
        <h2 className="pb-5 whitespace-nowrap font-semibold text-lg md:text-2xl lg:text-[2.5rem]">
          Login to your Account
        </h2>
        <div className="flex flex-wrap relative items-stretch  w-full">
          <span className="absolute w-12 h-12 z-1000 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
              className="w-[16px] block align-middle "
            >
              <g
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.2"
              >
                <path d="M2.25 5.25a1.5 1.5 0 0 1 1.5-1.5h10.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5H3.75a1.5 1.5 0 0 1-1.5-1.5v-7.5Z" />
                <path d="M2.25 5.25 9 9.75l6.75-4.5" />
              </g>
            </svg>
          </span>
          <input
            type="email"
            name="email"
            className="block outline-none focus:border-blue-400 rounded-lg pr-[1.5rem] py-4 pl-[3rem] text-base w-full border-[1px] border-[#bdbfd4] bg-[#E8F0FE] dark:bg-transparent bg-clip"
            placeholder="Enter Your Email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>
        {formik.touched.email && formik.errors.email && (
          <p className="form-text mb-0 !text-red-600  my-4">
            {formik.touched.email && formik.errors.email}
          </p>
        )}
      </div>
      <div className="text-start">
        <div className="flex flex-wrap relative items-stretch  w-full">
          <span className="absolute w-12 h-12 z-1000 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              className="w-[16px]"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <path d="M12 3a12 12 0 0 0 8.5 3A12 12 0 0 1 12 21 12 12 0 0 1 3.5 6 12 12 0 0 0 12 3" />
              <circle cx="12" cy="11" r="1" />
              <path d="M12 12v2.5" />
            </svg>
          </span>
          <input
            type="password"
            name="password"
            className="block outline-none focus:border-blue-400 dark:bg-transparent rounded-lg pr-[1.5rem] py-4 pl-[3rem] text-base w-full border-[1px] border-[#bdbfd4] bg-[#E8F0FE] bg-clip"
            placeholder="Password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </div>
        {formik.touched.password && formik.errors.password && (
          <p className="form-text !text-red-600 my-4">
            {formik.touched.password && formik.errors.password}
          </p>
        )}
        <div className="form-text mt-2">
          <Link
            href="/reset-password"
            className="no-underline text-[#6a4dff] dark:text-[#e6f85e] "
          >
            Forgot Password?
          </Link>
        </div>
      </div>
      {submittingError !== "" && (
        <div
          className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 !text-left"
          role="alert"
        >
          <p className="mb-0">{submittingError}</p>
        </div>
      )}
      <div className="text-center">
        <button
          disabled={submitting}
          type="submit"
          className=" w-full py-4 rounded-md !bg-[#6a4dff]  dark:!bg-[#e6f85e] text-gray-100 dark:text-gray-950  disabled:opacity-[.65]"
        >
          {submitting ? (
            <span className="flex items-center justify-center">
              {refreshIconRotating}
            </span>
          ) : (
            "Sign In"
          )}
        </button>
      </div>
      <div className="text-center">
        <p>
          Don{"'"}t have an account?{" "}
          <Link
            href="/register"
            className="no-underline hover:underline text-[#6a4dff] dark:text-[#e6f85e]"
          >
            Sign Up for Free
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
