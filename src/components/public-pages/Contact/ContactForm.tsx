"use client";
import axios from "axios";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyCaptcha } from "@/ServerActions";
import useTheme from "@/lib/useTheme";

const ContactForm = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsverified] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState(false);
  const [successAlert, setSuccessAlert] = useState("");
  const [theme, toggleTheme] = useTheme();

  async function handleCaptchaSubmission(token: string | null) {
    // Server function to verify captcha
    await verifyCaptcha(token)
      .then(() => setIsverified(true))
      .catch(() => setIsverified(false));
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    onSubmit: (values) => {
      if (isVerified) {
        setSubmitting(true);
        setSuccessAlert("");
        // Submit form data to server
        axios.post("/api/sendEmail", values).then((resp) => {
          setSubmitting(false);
          formik.resetForm();
          recaptchaRef.current?.reset();
          setSuccessAlert("Email has been sent!");
        });
      }
    },
  });

  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-col">
        <form
          className="grid xs:grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={formik.handleSubmit}
        >
          <div className=" flex flex-col justify-start items-start md:col-span-2">
            <label
              htmlFor="name"
              className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-400"
            >
              Your Name*
            </label>
            <div className="group flex flex-row justify-start items-center gap-3 p-3 border-[1px] border-gray-600 rounded-lg w-full dark:focus-within:border-[#e6f85e] focus-within:border-[#6a4dff]">
              <span className="text-gray-800 dark:text-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx="12" cy="7" r="4" />
                  <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                </svg>
              </span>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full text-base text-gray-900 bg-transparent outline-none dark:text-gray-100"
                placeholder="What's your name?"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col stify-start items-start ">
            <label
              htmlFor="phone"
              className="text-lg font-medium text-gray-900 dark:text-gray-400 mb-2"
            >
              Phone Number
            </label>
            <div className="group flex flex-row justify-start items-center gap-3 p-3 border-[1px] border-gray-600 rounded-lg w-full dark:focus-within:border-[#e6f85e] focus-within:border-[#6a4dff]">
              <span className="text-gray-800 dark:text-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2m10 3a2 2 0 0 1 2 2m-2-6a6 6 0 0 1 6 6" />
                </svg>
              </span>
              <input
                type="number"
                id="phone"
                name="phone"
                className="text-gray-900 dark:text-gray-100 w-full text-base bg-transparent outline-none"
                placeholder="Phone Number"
                value={formik.values.phone}
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col stify-start items-start ">
            <label
              htmlFor="email"
              className="text-lg font-medium text-gray-900 dark:text-gray-400 mb-2"
            >
              Email Address*
            </label>
            <div className="group flex flex-row justify-start items-center gap-3 p-3 border-[1px] border-gray-600 rounded-lg w-full dark:focus-within:border-[#e6f85e] focus-within:border-[#6a4dff]">
              <span className="text-gray-800 dark:text-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                  className="w-5 h-5"
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
                id="email"
                name="email"
                className="text-gray-900 dark:text-gray-100 w-full text-base bg-transparent outline-none"
                placeholder="Enter Your Email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col justify-start items-start md:col-span-2">
            <label
              htmlFor="message"
              className="text-lg text-gray-900 font-medium dark:text-gray-400 mb-2"
            >
              Your Message*
            </label>
            <textarea
              id="message"
              name="message"
              className="text-gray-900 dark:text-gray-100 group  bg-transparent dark:focus-within:border-[#e6f85e] focus-within:border-[#6a4dff] focus:outline-none  border-gray-600  border-[1px] w-full p-2 rounded-md"
              placeholder="Write your message here"
              rows={4}
              value={formik.values.message}
              onChange={formik.handleChange}
            ></textarea>
          </div>
          {/* Success Alert */}
          {successAlert && (
            <div
              className="mb-4 p-4 rounded-md border-[#a3cfbb] bg-[#d1e7dd] text-[#0a3622]"
              role="alert"
            >
              {successAlert}
            </div>
          )}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 justify-between items-start md:col-span-2">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
              ref={recaptchaRef}
              onChange={handleCaptchaSubmission}
              theme={theme}
            />
            <div className="flex  md:justify-end">
              <button
                type="submit"
                disabled={submitting || !isVerified}
                className="px-6 py-3 text-base rounded-md dark:bg-[#e6f85e]  bg-[#6a4dff]  text-gray-950 dark:disabled:bg-[#bcc76d] disabled:bg-[#9580ff]"
              >
                {submitting ? "Submitting..." : "Send Message"}
              </button>
            </div>
          </div>
          <div className="hidden p-4 mb-0 rounded-md"></div>
        </form>
      </div>
    </div>
  );
};
export default ContactForm;
