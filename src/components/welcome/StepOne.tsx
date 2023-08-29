import { useDispatch, useSelector } from "react-redux";
import { setStepOne } from "@/store/registerSlice";
import { useEffect } from "react";

const StepOne = () => {
  // Redux
  const dispatch = useDispatch();
  const stepOne = useSelector((state: any) => state.register.stepOne);
  const { firstName, lastName } = stepOne;

  useEffect(() => {
    if (firstName && lastName) {
      dispatch(setStepOne({ isValid: true }));
    } else {
      dispatch(setStepOne({ isValid: false }));
    }
  }, [firstName, lastName]);

  return (
    <>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        What is your Name?
      </h1>
      {/* Input */}
      <div>
        <label
          htmlFor="firstName"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          First Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={firstName}
          onChange={(e) => {
            dispatch(setStepOne({ firstName: e.target.value }));
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      {/* Input */}
      <div>
        <label
          htmlFor="lastName"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Last Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={lastName}
          onChange={(e) => {
            dispatch(setStepOne({ lastName: e.target.value }));
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    </>
  );
};
export default StepOne;
