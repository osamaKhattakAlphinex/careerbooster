import { useDispatch } from "react-redux";
import { months, getYearsList, countriesList } from "@/helpers/listsProvider";
import { setStepFive } from "@/store/registerSlice";
const years = getYearsList();

const ExperienceForm = ({ formik }: any) => {
  const dispatch = useDispatch();
  return (
    <form className="space-y-4" onSubmit={formik.handleSubmit}>
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">
          Job title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="jobTitle"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.jobTitle}
          className={`w-full border border-gray-300 ${
            formik.touched.jobTitle &&
            formik.errors.jobTitle &&
            "border-red-500 outline-red-500"
          } rounded-md px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500`}
        />
        {formik.touched.jobTitle && formik.errors.jobTitle && (
          <p className="text-red-600">
            {formik.touched.jobTitle && formik.errors.jobTitle}
          </p>
        )}
      </div>
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">
          Company
        </label>
        <input
          type="text"
          name="company"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.company}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">
          Country
        </label>
        <select
          className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
          name="country"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.country}
        >
          {countriesList.map((countryName: string) => (
            <option key={countryName} value={countryName}>
              {countryName}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">
          City, State
        </label>
        <input
          type="text"
          name="cityState"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.cityState}
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
              value={formik.values.fromYear}
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
                value={formik.values.toYear}
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
            id="currentlyWorking"
            className="mr-2"
            name="isContinue"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            checked={formik.values.isContinue}
          />
          <label htmlFor="currentlyWorking" className="text-sm text-gray-700">
            I currently work here
          </label>
        </div>
      </div>
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <p className="block text-xs text-gray-500">
          Describe your position and any key accomplishments.
        </p>
        <textarea
          rows={5}
          name="description"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.description}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="w-full">
        <button
          type="submit"
          disabled={String(formik.errors.jobTitle) !== "undefined"}
          className=" px-4 bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 mr-4 disabled:bg-blue-300"
        >
          Save Exerience
        </button>
        <button
          type="button"
          onClick={(e) => dispatch(setStepFive({ state: "show" }))}
          className=" px-4 bg-gray-500 text-white rounded-md py-2 hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ExperienceForm;
