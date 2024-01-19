/* eslint-disable react/display-name */
"use client";

import { Credit } from "@/app/(admin_route)/admin/credits/page";
import axios from "axios";
import * as Yup from "yup";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { FeatureRow } from "@/components/admin/linkedin-prompts/user-packages/AddPackage";
import { useFormik } from "formik";

type Props = {
  refresh: () => void;
};

const initialValues: Credit = {
  title: "",
  totalCredits: 0,
  features: [""],
  featuresToolTips: [""],
  amount: 0,
  status: "active",
  category: "basic",
};

const CreditsModal = forwardRef((props: Props, ref: any) => {
  const [openCreditModal, setOpenCreditModal] = useState<boolean>(false);
  const [credit, setCredit] = useState<Credit>(initialValues);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const [modalType, setModalType] = useState<"new" | "update" | "delete">(
    "new"
  );

  const URL = "/api/checkout/getActiveCreditPackages";

  const openModal = (open: boolean, credit: any, type: any) => {
    setOpenCreditModal(open);

    if (credit) {
      setCredit(credit);
    } else {
      setCredit(initialValues);
    }
    if (type === "delete") {
      setIsDisabled(true);
    }
    setModalType(type);
  };

  useImperativeHandle(ref, () => ({
    openModal,
  }));

  useEffect(() => {
    formik.setValues({
      title: credit.title,
      amount: credit.amount,
      category: credit.category,
      status: credit.status,
      features: credit.features,
      featuresToolTips: credit.featuresToolTips,
      totalCredits: credit.totalCredits,
    });
  }, [credit]);

  const handleFeatureRemove = (idx: number) => {
    const newFeatures = [...formik.values.features];

    newFeatures.splice(idx, 1);

    const newTooltips = [...formik.values.featuresToolTips];
    newTooltips.splice(idx, 1);

    formik.setFieldValue("features", newFeatures);
    formik.setFieldValue("featuresToolTips", newFeatures);
  };

  const formik = useFormik({
    initialValues: {
      title: credit.title,
      amount: credit.amount,
      category: credit.category,
      status: credit.status,
      features: credit.features,
      featuresToolTips: credit.featuresToolTips,
      totalCredits: credit.totalCredits,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please Credits Name"),
      amount: Yup.number()
        .required("Please Enter Your Amount")
        .min(0, "Minimum Value is 0"),
      category: Yup.string().required("Please Select at least one category"),
      status: Yup.string().required(
        'Please select either "Active" or "Inactive"'
      ),
      totalCredits: Yup.number()
        .required("Please Enter Credits")
        .min(0, "Minimum Value is 0"),

      features: Yup.array(Yup.string())
        .required("Please Enter THe Features")
        .min(1, "Please Provide atleast 1 feature"),
      featuresToolTips: Yup.array(Yup.string())
        .required("Please Enter The Features Tooltip")
        .min(1, "Please Provide atleast 1 feature tooltip"),
    }),

    onSubmit: async (values) => {
      if (modalType === "update") {
        try {
          await axios.put(`${URL}/${credit._id}`, { ...values });
        } catch (error) {
          console.log(error);
        }
      } else if (modalType === "new") {
        try {
          await axios.post(URL, { ...values });
        } catch (error) {
          console.log(error);
        }
      } else if (modalType === "delete") {
        try {
          await axios.delete(`${URL}/${credit._id}`);
        } catch (error) {
          console.log(error);
        }
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
      <div className="relative p-4 w-full max-w-xl max-h-full">
        <div className="relative p-4 text-center rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <button
            onClick={() => openModal(false, null, "new")}
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
          <form onSubmit={formik.handleSubmit}>
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              {/* <!-- Modal content --> */}
              {modalType === "delete" ? (
                <span> Are you sure you want to delete this record?</span>
              ) : (
                <div className="relative ">
                  <div className="grid gap-4 mb-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Title
                      </label>
                      <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                        type="text"
                        name="title"
                        disabled={isDisabled}
                        id="title"
                        className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Title"
                      />
                      {formik.touched.title && formik.errors.title && (
                        <p className="text-red-600 pt-3">
                          {formik.errors.title}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="amount"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Amount
                      </label>
                      <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.amount}
                        type="number"
                        disabled={isDisabled}
                        name="amount"
                        id="amount"
                        className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="0"
                      />
                      {formik.touched.amount && formik.errors.amount && (
                        <p className="text-red-600 pt-3">
                          {formik.errors.amount}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="totalCredits"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Total Credits
                      </label>
                      <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.totalCredits}
                        disabled={isDisabled}
                        type="number"
                        name="totalCredits"
                        id="totalCredits"
                        className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="0"
                      />
                      {formik.touched.totalCredits &&
                        formik.errors.totalCredits && (
                          <p className="text-red-600 pt-3">
                            {formik.errors.totalCredits}
                          </p>
                        )}
                    </div>

                    <div>
                      <label
                        htmlFor="category"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Category
                      </label>
                      <select
                        disabled={isDisabled}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.category}
                        id="category"
                        name="category"
                        className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      >
                        <option>Select Your Category</option>
                        <option value="basic">Basic</option>
                        <option value="standard">Standard</option>
                        <option value="premium">Premium</option>
                      </select>
                      {formik.touched.category && formik.errors.category && (
                        <p className="text-red-600 pt-3">
                          {formik.errors.category}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="status"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Status
                      </label>
                      <select
                        disabled={isDisabled}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.status}
                        id="status"
                        name="status"
                        className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>

                      {formik.touched.status && formik.errors.status && (
                        <p className="text-red-600 pt-3">
                          {formik.errors.status}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mb-4 w-ful">
                    <span className="text-xl">Features</span>
                    <div className="flex pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"></div>
                  </div>
                  {formik.values.features.map((_, index) => (
                    <FeatureRow
                      id={index}
                      feature={formik.values.features[index]}
                      tooltip={formik.values.featuresToolTips[index]}
                      key={`feature-row-${index}`}
                      onChangeFeature={(feature: string) => {
                        formik.setFieldValue(`features[${index}]`, feature);
                      }}
                      onChangeTooltip={(tooltip: string) => {
                        formik.setFieldValue(
                          `featuresToolTips[${index}]`,
                          tooltip
                        );
                      }}
                      onBlurFeature={formik.handleBlur}
                      onBlurTooltip={formik.handleBlur}
                      onFeatureRemove={(idx: number) =>
                        handleFeatureRemove(idx)
                      }
                    />
                  ))}

                  <button
                    className="mt-2 mb-5"
                    type="button"
                    onClick={(e) => {
                      formik.setFieldValue("features", [
                        ...formik.values.features,
                        "",
                      ]);
                      formik.setFieldValue("featuresToolTips", [
                        ...formik.values.featuresToolTips,
                        "",
                      ]);
                    }}
                  >
                    + Add More Feature
                  </button>
                </div>
              )}
            </div>
            <div className="flex justify-center items-center space-x-4">
              <button
                data-modal-toggle="deleteModal"
                type="button"
                onClick={() => setOpenCreditModal(false)}
                className="py-2 px-3 text-sm font-medium text-gray-500 rounded-lg border-[1px] border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
              <button type="submit">
                {modalType === "delete" ? (
                  <span className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                    Delete
                  </span>
                ) : modalType === "new" ? (
                  <span className="py-2 px-3 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-900">
                    Add New
                  </span>
                ) : (
                  <span className="py-2 px-3 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-green-900">
                    Update
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});

export default CreditsModal;
