/* eslint-disable react/display-name */
"use client";

import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import * as Yup from "yup";

type FineTuningModelType = {
  formHandler: (e: any) => {};
};

const gpt_based_model = [
  "gpt-3.5-turbo-1106",
  "gpt-3.5-turbo-0613",
  "babbage-002",
  "davinci-002",
  "gpt-4-0613",
];
const fine_tuned_model = [
  "fine-tuned-model-01",
  "fine-tuned-model-02",
  "fine-tuned-model-03",
];

const FineTuningModel = forwardRef((props: FineTuningModelType, ref: any) => {
  const [openFineTuneModel, setOpenFineTuneModel] = useState<boolean>(false);
  const [baseModels, setBaseModels] = useState<string[]>([...gpt_based_model]);
  const openModal = (open: boolean) => {
    setOpenFineTuneModel(open);
  };

  const formik = useFormik({
    initialValues: {
      tuningType: "commercial-gpt-model",
      baseModel: "",
      trainingFile: null,
    },

    onSubmit: (values) => {
      console.log(values);
      props.formHandler(values);

      setOpenFineTuneModel(false);
    },

    validationSchema: Yup.object().shape({
      tuningType: Yup.string().required("Please Select The of Tuning."),
      baseModel: Yup.string().required(
        "Please Select The Base Model for Tuning."
      ),
      trainingFile: Yup.mixed().required("File is required"),
    }),
  });

  useImperativeHandle(ref, () => ({
    openModal,
  }));

  useEffect(() => {
    console.log("values", formik.values);
  }, [openFineTuneModel]);
  const handleDeletionOk = async () => { };

  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${openFineTuneModel ? "flex" : "hidden"
        }`}
    >
      <div className="relative p-4 w-full max-w-xl max-h-full">
        <div className="relative p-4 text-center rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <h1 className="text-2xl font-bold text-white">
            Configure Fine-Tuning
          </h1>

          <button
            onClick={() => openModal(false)}
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

          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col justify-start items-start gap-4 p-2"
          >
            {/* Tuning Type */}
            <div className="grid grid-cols-3">
              <label className="col-span-1 text-left">Tuning Type</label>

              <label className="col-span-1 text-left ml-2">
                <input
                  className="mr-2"
                  type="radio"
                  name="tuningType"
                  value="gpt-model"
                  onChange={(e) => {
                    formik.handleChange(e);
                    setBaseModels(gpt_based_model);
                  }}
                />
                GPT Model
              </label>
              <label className="col-span-1 text-left ml-2">
                <input
                  className="mr-2"
                  type="radio"
                  name="tuningType"
                  value="tuned-model"
                  onChange={(e) => {
                    formik.handleChange(e);
                    setBaseModels(fine_tuned_model);
                  }}
                />
                Fine Tuned Model
              </label>

              {formik.touched.tuningType && formik.errors.tuningType && (
                <p className="text-red-600 pt-3">{formik.errors.tuningType}</p>
              )}
            </div>

            {/* Base Model */}
            <div className="grid grid-cols-3 w-full">
              <label className="col-span-1 text-left">Base Model</label>
              <div className="col-span-2">
                <select
                  className="w-full "
                  name="baseModel"
                  value={formik.values.baseModel}
                  onChange={formik.handleChange}
                >
                  {baseModels &&
                    baseModels.map((m, i) => (
                      <option
                        value={m}
                        key={i}
                        selected={i === 0 ? true : false}
                      >
                        {m}
                      </option>
                    ))}
                </select>
                {formik.touched.baseModel && formik.errors.baseModel && (
                  <p className="text-red-600">{formik.errors.baseModel}</p>
                )}
              </div>
            </div>
            {/* Training Data */}
            <div className="grid grid-cols-3 w-full">
              <label className="col-span-1 text-left">Training Data</label>
              <div className="">
                <input
                  id="file"
                  name="trainingFile"
                  type="file"
                  onChange={(event) => {
                    formik.setFieldValue(
                      "trainingFile",
                      event.currentTarget.files?.[0]
                    );
                  }}
                />
                {formik.touched.trainingFile && formik.errors.trainingFile && (
                  <p className="text-red-600 pt-3">
                    {formik.errors.trainingFile}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 w-full">
              <div className=" col-span-1"></div>
              <div className=" col-span-2 flex justify-end items-center space-x-4">
                <button
                  type="button"
                  onClick={() => setOpenFineTuneModel(false)}
                  className="py-2 px-3 text-sm font-medium text-gray-500 rounded-lg border-[1px] border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  No, cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-3 text-sm font-medium text-gray-500 rounded-lg border-[1px] border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Tune Modal
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});

export default FineTuningModel;
