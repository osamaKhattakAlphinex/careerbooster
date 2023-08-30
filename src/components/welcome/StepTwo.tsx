import { useDispatch, useSelector } from "react-redux";
import { setStepTwo } from "@/store/registerSlice";
import { useEffect } from "react";

const StepTwo = () => {
  // Redux
  const dispatch = useDispatch();
  const stepTwo = useSelector((state: any) => state.register.stepTwo);

  useEffect(() => {
    if (stepTwo.Email) {
      // check if email is valid or not
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(stepTwo.Email)) {
        dispatch(setStepTwo({ emailInvalid: false }));
      } else {
        dispatch(setStepTwo({ emailInvalid: true }));
      }
    }
    if (
      stepTwo.phoneNumber &&
      stepTwo.Email &&
      stepTwo.emailInvalid === false
    ) {
      dispatch(setStepTwo({ isValid: true }));
    } else {
      dispatch(setStepTwo({ isValid: false }));
    }
  }, [stepTwo.phoneNumber, stepTwo.Email]);

  return (
    <>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Your Contact Details
      </h1>
      {/* Input */}
      <div>
        <label
          htmlFor="phone"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="phone"
          id="phone"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={stepTwo.phoneNumber}
          onChange={(e) => {
            dispatch(setStepTwo({ phoneNumber: e.target.value }));
          }}
        />
      </div>

      {/* Input */}
      <div>
        <label
          htmlFor="Email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="Email"
          id="Email"
          value={stepTwo.Email}
          onChange={(e) => {
            dispatch(setStepTwo({ Email: e.target.value }));
          }}
          className={`bg-gray-50 border ${
            stepTwo.emailInvalid ? "border-red-500 outline-red-500" : ""
          } border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        />
        {stepTwo.emailInvalid && (
          <p className="text-red-500 text-sm">
            Please enter a valid email address
          </p>
        )}
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
        your contact details won{"'"}t be public and will not be shared with
        anyone. These details will only used to make a better Resume
      </p>
    </>
  );
};
export default StepTwo;
