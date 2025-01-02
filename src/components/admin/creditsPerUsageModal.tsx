/* eslint-disable react/display-name */
"use client";
import axios from "axios";
import * as Yup from "yup";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useFormik } from "formik";
import { CreditModalRef, CreditPerUsage } from "@/app/(admin_route)/admin/creditPerUsage/page";

type Props = {
  refresh: () => void;
};

const initialValues: CreditPerUsage = {
  resume_summary_generation: 0,
  resume_basicInfo: 0,
  resume_skills: 0,
  resume_individualWorkExperience: 0,
  linkedin_keywords_generation: 0,
  linkedin_headline_generation: 0,
  linkedin_about_generation: 0,
  linkedin_individualWorkExperience: 0,
  cover_letter_generation: 0,
  email_generation: 0,
  pdf_files_upload: 0,
  review_resume: 0,
  consulting_bids_generation: 0,
  save_resume: 0,
  download_resume: 0,
};

const CreditsPerUsageModal = forwardRef<CreditModalRef, Props>((props, ref) => {
  const [openCreditModal, setOpenCreditModal] = useState<boolean>(false);
  const [credit, setCredit] = useState<CreditPerUsage>(initialValues);

  const URL = "/api/users/CreditLimits";

  const openModal = (open: boolean, credit: CreditPerUsage | null) => {
    setOpenCreditModal(open);

    if (credit) {
      setCredit(credit);
    } else {
      setCredit(initialValues);
    }
  };

  useImperativeHandle(ref, () => ({
    openModal,
  }));

  useEffect(() => {
    formik.setValues({
      resume_summary_generation: credit.resume_summary_generation,
      resume_basicInfo: credit.resume_basicInfo,
      resume_skills: credit.resume_skills,
      resume_individualWorkExperience: credit.resume_individualWorkExperience,
      linkedin_keywords_generation: credit.linkedin_keywords_generation,
      linkedin_headline_generation: credit.linkedin_headline_generation,
      linkedin_about_generation: credit.linkedin_about_generation,
      linkedin_individualWorkExperience:
        credit.linkedin_individualWorkExperience,
      cover_letter_generation: credit.cover_letter_generation,
      email_generation: credit.email_generation,
      pdf_files_upload: credit.pdf_files_upload,
      review_resume: credit.review_resume,
      consulting_bids_generation: credit.consulting_bids_generation,
      save_resume: credit.save_resume,
      download_resume: credit.download_resume,
    });
  }, [credit]);

  const formik = useFormik({
    initialValues: {
      resume_summary_generation: credit.resume_summary_generation,
      resume_basicInfo: credit.resume_basicInfo,
      resume_skills: credit.resume_skills,
      resume_individualWorkExperience: credit.resume_individualWorkExperience,
      linkedin_keywords_generation: credit.linkedin_keywords_generation,
      linkedin_headline_generation: credit.linkedin_headline_generation,
      linkedin_about_generation: credit.linkedin_about_generation,
      linkedin_individualWorkExperience:
        credit.linkedin_individualWorkExperience,
      cover_letter_generation: credit.cover_letter_generation,
      email_generation: credit.email_generation,
      pdf_files_upload: credit.pdf_files_upload,
      review_resume: credit.review_resume,
      consulting_bids_generation: credit.consulting_bids_generation,
      save_resume: credit.save_resume,
      download_resume: credit.download_resume,
    },
    validationSchema: Yup.object({
      resume_summary_generation: Yup.number()
        .required("Please Enter Credits Points")
        .min(0, "Minimum Value is 0"),
      resume_basicInfo: Yup.number()
        .required("Please Enter Credits Points")
        .min(0, "Minimum Value is 0"),
      resume_skills: Yup.number()
        .required("Please Enter Credits Points")
        .min(0, "Minimum Value is 0"),
      resume_individualWorkExperience: Yup.number()
        .required("Please Enter Credits Points")
        .min(0, "Minimum Value is 0"),
      linkedin_keywords_generation: Yup.number()
        .required("Please Enter Credits Points")
        .min(0, "Minimum Value is 0"),
      linkedin_headline_generation: Yup.number()
        .required("Please Enter Credits Points")
        .min(0, "Minimum Value is 0"),
      linkedin_about_generation: Yup.number()
        .required("Please Enter Credits Points")
        .min(0, "Minimum Value is 0"),
      linkedin_individualWorkExperience: Yup.number()
        .required("Please Enter Credits Points")
        .min(0, "Minimum Value is 0"),
      cover_letter_generation: Yup.number()
        .required("Please Enter Credits Points")
        .min(0, "Minimum Value is 0"),
      email_generation: Yup.number()
        .required("Please Enter Credits Points")
        .min(0, "Minimum Value is 0"),
      pdf_files_upload: Yup.number()
        .required("Please Enter Credits Points")
        .min(0, "Minimum Value is 0"),
      review_resume: Yup.number()
        .required("Please Enter Credits Points")
        .min(0, "Minimum Value is 0"),
      consulting_bids_generation: Yup.number()
        .required("Please Enter Credits Points")
        .min(0, "Minimum Value is 0"),
      save_resume: Yup.number()
        .required("Please Enter Credits Points")
        .min(0, "Minimum Value is 0"),
      download_resume: Yup.number()
        .required("Please Enter Credits Points")
        .min(0, "Minimum Value is 0"),
    }),

    onSubmit: async (values) => {
      try {
        await axios.put(URL, { ...values });
      } catch (error) {
        console.log(error);
      }
      setOpenCreditModal(false);
      props.refresh();
    },
  });

  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${openCreditModal ? "flex" : "hidden"
        }`}
    >
      <div className="relative p-4 w-full max-w-xxl max-h-full">
        <div className="relative p-4 text-center rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <button
            onClick={() => openModal(false, null)}
            type="button"
            className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="deleteModal"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>

          <h2 className=" text-base uppercase font-bold ">Manage Credits</h2>
          <form
            onSubmit={formik.handleSubmit}
            className=" grid grid-cols-3 row-auto gap-3"
          >
            {/* consulting_bids_generation */}
            <div className=" col-span-1">
              <label
                htmlFor={"consulting_bids_generation"}
                className="text-left capitalize block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Consulting Bids generation
              </label>
              <input
                type="text"
                id={"consulting_bids_generation"}
                name={"consulting_bids_generation"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.consulting_bids_generation + ""}
                className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder={"consulting_bids_generation"}
              />
              {formik.touched.consulting_bids_generation &&
                formik.errors.consulting_bids_generation && (
                  <p className="text-red-600 pt-3">
                    {formik.errors.consulting_bids_generation + ""}
                  </p>
                )}
            </div>
            {/*cover_letter_generation  */}
            <div className=" col-span-1">
              <label
                htmlFor={"cover_letter_generation"}
                className="text-left capitalize block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                cover letter generation
              </label>
              <input
                type="text"
                id={"cover_letter_generation"}
                name={"cover_letter_generation"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cover_letter_generation + ""}
                className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder={"consulting_bids_generation"}
              />
              {formik.touched.cover_letter_generation &&
                formik.errors.cover_letter_generation && (
                  <p className="text-red-600 pt-3">
                    {formik.errors.cover_letter_generation + ""}
                  </p>
                )}
            </div>
            {/*download_resume  */}
            <div className=" col-span-1">
              <label
                htmlFor={"download_resume"}
                className="text-left capitalize block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                download resume
              </label>
              <input
                type="text"
                id={"download_resume"}
                name={"download_resume"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.download_resume + ""}
                className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder={"download_resume"}
              />
              {formik.touched.download_resume &&
                formik.errors.download_resume && (
                  <p className="text-red-600 pt-3">
                    {formik.errors.download_resume + ""}
                  </p>
                )}
            </div>
            {/*email_generation  */}
            <div className=" col-span-1">
              <label
                htmlFor={"email_generation"}
                className="text-left capitalize block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                email generation
              </label>
              <input
                type="text"
                id={"email_generation"}
                name={"email_generation"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email_generation + ""}
                className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder={"email_generation"}
              />
              {formik.touched.email_generation &&
                formik.errors.email_generation && (
                  <p className="text-red-600 pt-3">
                    {formik.errors.email_generation + ""}
                  </p>
                )}
            </div>
            {/*linkedin_about_generation  */}
            <div className=" col-span-1">
              <label
                htmlFor={"linkedin_about_generation"}
                className="text-left capitalize block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                linkedin about generation
              </label>
              <input
                type="text"
                id={"linkedin_about_generation"}
                name={"linkedin_about_generation"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.linkedin_about_generation + ""}
                className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder={"linkedin_about_generation"}
              />
              {formik.touched.linkedin_about_generation &&
                formik.errors.linkedin_about_generation && (
                  <p className="text-red-600 pt-3">
                    {formik.errors.linkedin_about_generation + ""}
                  </p>
                )}
            </div>
            {/*linkedin_headline_generation  */}
            <div className=" col-span-1">
              <label
                htmlFor={"linkedin_headline_generation"}
                className="text-left capitalize block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                linkedin headline generation
              </label>
              <input
                type="text"
                id={"linkedin_headline_generation"}
                name={"linkedin_headline_generation"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.linkedin_headline_generation + ""}
                className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder={"linkedin_headline_generation"}
              />
              {formik.touched.linkedin_headline_generation &&
                formik.errors.linkedin_headline_generation && (
                  <p className="text-red-600 pt-3">
                    {formik.errors.linkedin_headline_generation + ""}
                  </p>
                )}
            </div>
            {/*linkedin_individualWorkExperience  */}
            <div className=" col-span-1">
              <label
                htmlFor={"linkedin_individualWorkExperience"}
                className="text-left capitalize block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                linkedin individual Work Experience
              </label>
              <input
                type="text"
                id={"linkedin_individualWorkExperience"}
                name={"linkedin_individualWorkExperience"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.linkedin_individualWorkExperience + ""}
                className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder={"linkedin_individualWorkExperience"}
              />
              {formik.touched.linkedin_individualWorkExperience &&
                formik.errors.linkedin_individualWorkExperience && (
                  <p className="text-red-600 pt-3">
                    {formik.errors.linkedin_individualWorkExperience + ""}
                  </p>
                )}
            </div>
            {/*linkedin_keywords_generation  */}
            <div className=" col-span-1">
              <label
                htmlFor={"linkedin_keywords_generation"}
                className="text-left capitalize block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                linkedin keywords generation
              </label>
              <input
                type="text"
                id={"linkedin_keywords_generation"}
                name={"linkedin_keywords_generation"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.linkedin_keywords_generation + ""}
                className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder={"linkedin_keywords_generation"}
              />
              {formik.touched.linkedin_keywords_generation &&
                formik.errors.linkedin_keywords_generation && (
                  <p className="text-red-600 pt-3">
                    {formik.errors.linkedin_keywords_generation + ""}
                  </p>
                )}
            </div>
            {/*pdf_files_upload  */}
            <div className=" col-span-1">
              <label
                htmlFor={"pdf_files_upload"}
                className="text-left capitalize block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                pdf files upload
              </label>
              <input
                type="text"
                id={"pdf_files_upload"}
                name={"pdf_files_upload"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.pdf_files_upload + ""}
                className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder={"pdf_files_upload"}
              />
              {formik.touched.pdf_files_upload &&
                formik.errors.pdf_files_upload && (
                  <p className="text-red-600 pt-3">
                    {formik.errors.pdf_files_upload + ""}
                  </p>
                )}
            </div>
            {/*resume_basicInfo  */}
            <div className=" col-span-1">
              <label
                htmlFor={"resume_basicInfo"}
                className="text-left capitalize block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                resume basicInfo
              </label>
              <input
                type="text"
                id={"resume_basicInfo"}
                name={"resume_basicInfo"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.resume_basicInfo + ""}
                className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder={"resume_basicInfo"}
              />
              {formik.touched.resume_basicInfo &&
                formik.errors.resume_basicInfo && (
                  <p className="text-red-600 pt-3">
                    {formik.errors.resume_basicInfo + ""}
                  </p>
                )}
            </div>
            {/*resume_individualWorkExperience  */}
            <div className=" col-span-1">
              <label
                htmlFor={"resume_individualWorkExperience"}
                className="text-left capitalize block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                resume individual Work Experience
              </label>
              <input
                type="text"
                id={"resume_individualWorkExperience"}
                name={"resume_individualWorkExperience"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.resume_individualWorkExperience + ""}
                className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder={"resume_individualWorkExperience"}
              />
              {formik.touched.resume_individualWorkExperience &&
                formik.errors.resume_individualWorkExperience && (
                  <p className="text-red-600 pt-3">
                    {formik.errors.resume_individualWorkExperience + ""}
                  </p>
                )}
            </div>
            {/*resume_resume_skills  */}
            <div className=" col-span-1">
              <label
                htmlFor={"resume_resume_skills"}
                className="text-left capitalize block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                resume skills
              </label>
              <input
                type="text"
                id={"resume_skills"}
                name={"resume_skills"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.resume_skills + ""}
                className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder={"resume_skills"}
              />
              {formik.touched.resume_skills && formik.errors.resume_skills && (
                <p className="text-red-600 pt-3">
                  {formik.errors.resume_skills + ""}
                </p>
              )}
            </div>
            {/*resume_summary_generation  */}
            <div className=" col-span-1">
              <label
                htmlFor={"resume_summary_generation"}
                className="text-left capitalize block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                resume summary generation
              </label>
              <input
                type="text"
                id={"resume_summary_generation"}
                name={"resume_summary_generation"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.resume_summary_generation + ""}
                className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder={"resume_summary_generation"}
              />
              {formik.touched.resume_summary_generation &&
                formik.errors.resume_summary_generation && (
                  <p className="text-red-600 pt-3">
                    {formik.errors.resume_summary_generation + ""}
                  </p>
                )}
            </div>
            {/*review_resume  */}
            <div className=" col-span-1">
              <label
                htmlFor={"review_resume"}
                className="text-left capitalize block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                review resume
              </label>
              <input
                type="text"
                id={"review_resume"}
                name={"review_resume"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.review_resume + ""}
                className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder={"review_resume"}
              />
              {formik.touched.review_resume && formik.errors.review_resume && (
                <p className="text-red-600 pt-3">
                  {formik.errors.review_resume + ""}
                </p>
              )}
            </div>
            {/*save_resume  */}
            <div className=" col-span-1">
              <label
                htmlFor={"save_resume"}
                className="text-left capitalize block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                save resume
              </label>
              <input
                type="text"
                id={"save_resume"}
                name={"save_resume"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.save_resume + ""}
                className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder={"save_resume"}
              />
              {formik.touched.save_resume && formik.errors.save_resume && (
                <p className="text-red-600 pt-3">
                  {formik.errors.save_resume + ""}
                </p>
              )}
            </div>

            <div className="col-span-1"></div>
            <button
              type="submit"
              className="w-fit px-3 py-2 text-xs font-medium text-center text-white no-underline bg-green-700 rounded-lg whitespace-nowrap hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
});

export default CreditsPerUsageModal;
