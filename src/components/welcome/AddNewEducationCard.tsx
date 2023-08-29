import { useDispatch, useSelector } from "react-redux";
import { setStepFour } from "@/store/registerSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMemo } from "react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getYearsList = () => {
  const currentYear = new Date().getFullYear();
  const yearsRange = Array.from(
    { length: 101 },
    (_, index) => currentYear - 100 + index
  );

  return yearsRange;
};
const years = getYearsList();
const AddNewEducationCard = () => {
  const dispatch = useDispatch();
  const stepFour = useSelector((state: any) => state.register.stepFour);
  const { list, state } = stepFour;
  //
  const formik = useFormik({
    initialValues: {
      educationLevel: "",
      fieldOfStudy: "",
      schoolName: "",
      schoolLocation: "",
      fromMonth: "",
      fromYear: new Date().getFullYear(),
      isContinue: false,
      toMonth: "",
      toYear: new Date().getFullYear(),
    },
    validationSchema: Yup.object({
      educationLevel: Yup.string().required("Education Level is Required"),
    }),
    onSubmit: async (values) => {
      dispatch(setStepFour({ list: [...list, values] }));
      dispatch(setStepFour({ state: "show" }));
    },
  });

  return (
    <div className="w-full max-w-md mx-auto p-6 border rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">
        Add Education
        <button
          type="button"
          onClick={(e) => dispatch(setStepFour({ state: "show" }))}
          className="text-xs float-right flex flex-row gap-1 items-center hover:bg-gray-50 mt-2"
        >
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
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          View all educations
        </button>
      </h2>
      <form className="space-y-4" onSubmit={formik.handleSubmit}>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Level of education <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="educationLevel"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.educationLevel}
            className={`w-full border border-gray-300 ${
              formik.touched.educationLevel &&
              formik.errors.educationLevel &&
              "border-red-500 outline-red-500"
            } rounded-md px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500`}
          />
          {formik.touched.educationLevel && formik.errors.educationLevel && (
            <p className="text-red-600">
              {formik.touched.educationLevel && formik.errors.educationLevel}
            </p>
          )}
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Field of study
          </label>
          <input
            type="text"
            name="fieldOfStudy"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.fieldOfStudy}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            School
          </label>
          <input
            type="text"
            name="schoolName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.schoolName}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            School Location
          </label>
          <input
            type="text"
            name="schoolLocation"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.schoolLocation}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Time Period
          </label>
          <div className="flex space-x-4 mt-4">
            <div className="w-1/2">
              <label className="block text-xs text-gray-500">From Month</label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                name="fromMonth"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.fromMonth}
              >
                {months.map((month: string) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/2">
              <label className="block text-xs text-gray-500">From Year</label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                name="fromYear"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                defaultValue={formik.values.fromYear}
              >
                {years.map((year: number) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {!formik.values.isContinue && (
            <div className="flex space-x-4 mt-4">
              <div className="w-1/2">
                <label className="block text-xs text-gray-500">To Month</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                  name="toMonth"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.toMonth}
                >
                  {months.map((month: string) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/2">
                <label className="block text-xs text-gray-500">To Year</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                  name="toYear"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  defaultValue={formik.values.toYear}
                >
                  {years.map((year: number) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div className="mt-2">
            <input
              type="checkbox"
              id="currentlyEnrolled"
              className="mr-2"
              name="isContinue"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              checked={formik.values.isContinue}
            />
            <label
              htmlFor="currentlyEnrolled"
              className="text-sm text-gray-700"
            >
              Currently enrolled
            </label>
          </div>
        </div>
        <div className="w-full">
          <button
            type="submit"
            disabled={String(formik.errors.educationLevel) !== "undefined"}
            className=" px-4 bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 mr-4 disabled:bg-blue-300"
          >
            Save Education
          </button>
          <button
            type="button"
            onClick={(e) => dispatch(setStepFour({ state: "show" }))}
            className=" px-4 bg-gray-500 text-white rounded-md py-2 hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddNewEducationCard;
