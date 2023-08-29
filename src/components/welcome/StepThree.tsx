import { useDispatch, useSelector } from "react-redux";
import { setStepThree } from "@/store/registerSlice";
import { useEffect } from "react";

const StepThree = () => {
  // Redux
  const dispatch = useDispatch();
  const stepThree = useSelector((state: any) => state.register.stepThree);
  const { country, street, cityState, postalCode } = stepThree;

  useEffect(() => {
    if (country) {
      dispatch(setStepThree({ isValid: true }));
    } else {
      dispatch(setStepThree({ isValid: false }));
    }
  }, [country]);

  return (
    <>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Your Address
      </h1>
      {/* Input */}
      <div>
        <label
          htmlFor="country"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Country <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="country"
          id="country"
          value={country}
          onChange={(e) => {
            dispatch(setStepThree({ country: e.target.value }));
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      {/* Input */}
      <div>
        <label
          htmlFor="street"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Street address
        </label>
        <input
          type="text"
          name="street"
          id="street"
          value={street}
          onChange={(e) => {
            dispatch(setStepThree({ street: e.target.value }));
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      {/* Input */}
      <div>
        <label
          htmlFor="cityState"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          City, State
        </label>
        <input
          type="text"
          name="cityState"
          id="cityState"
          value={cityState}
          onChange={(e) => {
            dispatch(setStepThree({ cityState: e.target.value }));
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      {/* Input */}
      <div>
        <label
          htmlFor="postalCode"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Postal code
        </label>
        <input
          type="text"
          name="postalCode"
          id="postalCode"
          value={postalCode}
          onChange={(e) => {
            dispatch(setStepThree({ postalCode: e.target.value }));
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <p className="text-gray-600 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5  !mr-2  float-left"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg>
        We will also suggest you nearby jobs
      </p>
    </>
  );
};
export default StepThree;
