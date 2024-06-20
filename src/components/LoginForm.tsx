"use client";
import { useEffect, useRef, useState } from "react";
import { refreshIconRotating } from "@/helpers/iconsProvider";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { showSuccessToast } from "@/helpers/toast";

const LoginForm = () => {
  const router = useRouter();
  const [otpSend, setOtpSend] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submittingError, setSubmittingError] = useState<string>("");
  const [successAlert, setSuccessAlert] = useState<string>("");
  const otpInputsRefs = useRef<any>([]);
  const [emailEntered, setEmailEntered] = useState<boolean>(false);

  const handleOtpChange = (index: number, value: string) => {
    // Ensure only digits are entered
    const regex = /^[0-9]*$/;
    if (regex.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      formik.values.otp = Number(newOtp.join(""));
      // Move focus to the next input field
      if (index < otpInputsRefs.current.length - 1 && value.length === 1) {
        otpInputsRefs.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (index: any, e: any) => {
    if (e.keyCode === 8 && index > 0 && otp[index] === "") {
      // Move focus to the previous input field
      otpInputsRefs.current[index - 1].focus();
    }
  };
  const sendOTP = () => {
    if (!formik.errors.email) {
      setSubmittingError("");
      setSubmitting(true);
      axios.post("/api/sendOTP", formik.values).then((resp) => {
        setSubmitting(false);
        setSuccessAlert("OTP sent to your email!");
        setOtpSend(true);
      }).catch((err) => {
        setSubmitting(false);
        setSubmittingError(err.response.data.error);
      });
    } else {
      setEmailEntered(false);
    }
  };

  const handlePaste = (e: any) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    let pastedIndex = 0;

    // Distribute the pasted numbers one by one into each block from the start
    const newOtp = [...otp];
    for (let i = 0; i < otpInputsRefs.current.length; i++) {
      if (pastedIndex < pastedData.length) {
        const newValue = pastedData.charAt(pastedIndex);
        if (!isNaN(newValue)) {
          newOtp[i] = newValue;
          pastedIndex++;
        }
      }
    }
    setOtp(newOtp);
    formik.values.otp = Number(newOtp.join(""));
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: 0,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Email is Required"),
      otp: Yup.number()
        .integer("OTP must be an integer")
        .min(100000, "OTP must be exactly 6 digits")
        .max(999999, "OTP must be exactly 6 digits")
        .required("OTP is Required"),
    }),
    onSubmit: async (values) => {
      setSubmittingError("");
      setSubmitting(true);
      const res = await signIn("credentials", {
        email: values.email,
        otp: values.otp,
        redirect: false, // prevent default redirect
      });
      if (res?.error) {
        setSubmitting(false);
        return setSubmittingError(res.error);
      } 
      showSuccessToast("Logged in successfully");
      router.replace("/dashboard");
    },
  });
  useEffect(() => {
    // Check if email is entered and update state
    setEmailEntered(formik.values.email !== "");
  }, [formik.values.email]);
  useEffect(() => {
    if (successAlert !== "") {
      setTimeout(() => {
        setSuccessAlert("");
      }, 2000);
    }
  }, [successAlert]);
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col h-screen justify-center gap-4"
    >
      <div className="text-start">
        <h2 className="pb-5 mb-8 text-center whitespace-nowrap font-semibold text-2xl md:text-2xl lg:text-[2.5rem]">
          Login to your Account
        </h2>
        {!otpSend ? (
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
        ) : (
          <div className="flex gap-2 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                className="block outline-none text-center focus:border-blue-400 focus:border-[2px]  rounded-lg py-2 md:py-4 text-base w-10 md:w-12 border-[1px] border-[#bdbfd4] bg-[#E8F0FE] dark:bg-transparent bg-clip"
                placeholder=""
                maxLength={1}
                onBlur={formik.handleBlur}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleBackspace(index, e)}
                value={digit}
                onPaste={handlePaste}
                ref={(inputRef) => (otpInputsRefs.current[index] = inputRef)}
              />
            ))}
          </div>
        )}
        {formik.touched.email && formik.errors.email && (
          <p className="form-text  mb-0 !text-red-600  my-4">
            {formik.touched.email && formik.errors.email}
          </p>
        )}
        {formik.touched.otp && formik.errors.otp && (
          <p className="form-text mb-0 !text-red-600  my-4">
            {formik.touched.otp && formik.errors.otp}
          </p>
        )}
      </div>

      {submittingError !== "" && (
        <div
          className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 !text-left"
          role="alert"
        >
          <p className="mb-0">{submittingError}</p>
        </div>
      )}
      {otpSend && (
        <div className="text-center">
          <p>
            Don{"'"}t receive OTP?{" "}
            <Link
              onClick={sendOTP}
              href="#"
              className="no-underline hover:underline text-[#6a4dff] dark:text-[#e6f85e]"
            >
              Resend
            </Link>
          </p>
        </div>
      )}
      <div className="text-center">
        {!otpSend ? (
          <button
            onClick={sendOTP}
            className=" w-full py-4 rounded-md !bg-[#6a4dff]  dark:!bg-[#e6f85e] text-gray-100 dark:text-gray-950  disabled:opacity-[.65]"
            disabled={submitting || !emailEntered}
          >
            {submitting ? (
              <span className="flex items-center justify-center">
                {refreshIconRotating}
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        ) : (
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
              "Verify Token"
            )}
          </button>
        )}

        {successAlert && (
          <div
            className="m-4 py-2 rounded-md border-[#a3cfbb] bg-[#d1e7dd] text-[#0a3622]"
            role="alert"
          >
            {successAlert}
          </div>
        )}
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
