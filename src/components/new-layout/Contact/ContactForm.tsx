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
    <div
      className="row justify-center"
      data-aos="fade-up-sm"
      data-aos-delay="50"
    >
      <div className="col-lg-8 col-xl-6">
        <form className="vstack gap-8" onSubmit={formik.handleSubmit}>
          <div className="">
            <label htmlFor="name" className="form-label fs-lg fw-medium mb-4">
              Your name*
            </label>
            <div className="input-group with-icon">
              <span className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
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
                className="form-control rounded-2"
                placeholder="What's your name?"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="">
            <label htmlFor="email" className="form-label fs-lg fw-medium mb-4">
              Email Address*
            </label>
            <div className="input-group with-icon">
              <span className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
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
                className="form-control rounded-2"
                placeholder="Enter Your Email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="">
            <label htmlFor="phone" className="form-label fs-lg fw-medium mb-4">
              Phone Number
            </label>
            <div className="input-group with-icon">
              <span className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2m10 3a2 2 0 0 1 2 2m-2-6a6 6 0 0 1 6 6" />
                </svg>
              </span>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-control rounded-2"
                placeholder="Phone Number"
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="">
            <label
              htmlFor="message"
              className="form-label fs-lg fw-medium mb-4"
            >
              Your Message*
            </label>
            <textarea
              id="message"
              name="message"
              className="form-control rounded-2"
              placeholder="Write here your details message"
              rows={4}
              value={formik.values.message}
              onChange={formik.handleChange}
            ></textarea>
          </div>
          {/* Success Alert */}
          {successAlert && (
            <div className="alert alert-success" role="alert">
              {successAlert}
            </div>
          )}
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
            ref={recaptchaRef}
            onChange={handleCaptchaSubmission}
            theme={theme}
          />
          <div className="">
            <button
              type="submit"
              disabled={submitting || !isVerified}
              className="btn theme-btn disabled:theme-btn"
            >
              {submitting ? "Submitting..." : "Send Message"}
            </button>
          </div>
          <div className="status alert mb-0 d-none"></div>
        </form>
      </div>
    </div>
  );
};
export default ContactForm;
