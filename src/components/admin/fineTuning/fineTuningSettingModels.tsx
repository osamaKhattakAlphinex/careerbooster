/* eslint-disable react/display-name */
"use client";

import { MessageViewerRef } from "@/app/(admin_route)/admin/contacts/page";
import axios from "axios";
import { useFormik } from "formik";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import * as Yup from "yup";

interface TuningConfiguration {
  tuningBaseModel: string;
  allowSendingDataToTuning: boolean;
}

const FineTuningSettingModel = forwardRef<MessageViewerRef>((props,ref) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [openFineTuneModel, setOpenFineTuneModel] = useState<boolean>(false);
  const [settings, setSettings] = useState<TuningConfiguration | null>(null);

  const getTuningConfigurations = async () => {
    try {
      const res = await axios.get("/api/tuningConfiguration");

      if (res.data.success) {
        const { tuningBaseModel, allowSendingDataToTuning } = res.data.settings;
        setSettings({
          tuningBaseModel,
          allowSendingDataToTuning,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setTuningConfigurations = async (values: TuningConfiguration) => {
    try {
      const res = await axios.post("/api/tuningConfiguration", { ...values });

      if (res.data.success) {
        const { tuningBaseModel, allowSendingDataToTuning } = res.data.settings;
        setSettings({
          tuningBaseModel,
          allowSendingDataToTuning,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTuningConfigurations();
  }, []);

  useEffect(() => {
    formik.setFieldValue("tuningBaseModel", settings?.tuningBaseModel);
    formik.setFieldValue(
      "allowSendingDataToTuning",
      settings?.allowSendingDataToTuning
    );
  }, [settings]);

  const openModal = (open: boolean) => {
    setOpenFineTuneModel(open);
  };

  const formik = useFormik({
    initialValues: {
      tuningBaseModel: settings?.tuningBaseModel || "",
      allowSendingDataToTuning: settings?.allowSendingDataToTuning || false,
    },

    onSubmit: (values) => {
      setTuningConfigurations(values);
    },

    validationSchema: Yup.object().shape({
      tuningBaseModel: Yup.string().required(""),
    }),
  });

  useImperativeHandle(ref, () => ({
    openModal,
  }));

  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className={`overflow-y-auto overflow-x-hidden bg-white/50 fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${openFineTuneModel ? "flex" : "hidden"
        }`}
    >
      <div className="relative p-4 w-full max-w-xl max-h-full">
        <div className="relative p-4 text-center rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <h1 className="text-2xl font-bold text-white">
            Fine-Tuning Configuaration
          </h1>
          <div className="absolute top-2.5 right-2.5">
            <button
              onClick={() => openModal(false)}
              type="button"
              className="text-gray-400  bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col justify-start items-start gap-4 p-2"
          >
            <div className="grid grid-cols-4 gap-6 w-full">
              <label className="block col-span-2 text-left">
                Tuning Base Model
              </label>

              <input
                className="block col-span-2 w-full"
                type="text"
                name="tuningBaseModel"
                disabled={!editing}
                value={formik.values.tuningBaseModel}
                onChange={formik.handleChange}
              />
            </div>
            <div className="grid grid-cols-4 gap-6 w-full">
              <label className="col-span-2 text-left">
                Allow Sending Data To Tuning
              </label>
              <div className="col-span-2 w-full flex flex-row justify-start items-start">
                <input
                  className="h-6 w-6"
                  type="checkbox"
                  name="allowSendingDataToTuning"
                  disabled={!editing}
                  checked={formik.values.allowSendingDataToTuning}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            {editing ? (
              <div className="grid grid-cols-4 w-full">
                <div className=" col-span-1"></div>
                <div className=" col-span-2 flex justify-end items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="py-2 px-3 text-sm font-medium text-red-500 rounded-lg border-[1px] border-red-200 hover:bg-red-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-red-700 dark:text-white dark:border-red-500 dark:hover:text-white dark:hover:bg-red-600 "
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-3 text-sm font-medium text-gray-500 rounded-lg border-[1px] border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    Save Settings
                  </button>
                </div>
                <div className=" col-span-1"></div>
              </div>
            ) : (
              <div className="grid grid-cols-4 w-full">
                <div className=" col-span-1"></div>
                <div className=" col-span-2 flex justify-end items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => openModal(false)}
                    className="py-2 px-3 text-sm font-medium text-red-500 rounded-lg border-[1px] border-red-200 hover:bg-red-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-red-700 dark:text-white dark:border-red-500 dark:hover:text-white dark:hover:bg-red-600 "
                  >
                    Close Setting
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className="py-2 px-3 text-sm font-medium text-gray-500 rounded-lg border-[1px] border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    Edit Settings
                  </button>
                </div>
                <div className=" col-span-1"></div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
});

export default FineTuningSettingModel;
