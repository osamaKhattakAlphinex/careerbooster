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
      <div className="">
        <label htmlFor="name" className="form-label fs-lg fw-medium mb-4">
          {" "}
          Phone Number *{" "}
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
            name="phone"
            id="phone"
            value={stepTwo.phoneNumber}
            onChange={(e) => {
              dispatch(setStepTwo({ phoneNumber: e.target.value }));
            }}
            className="form-control rounded-2"
            placeholder=""
          />
        </div>
      </div>
      <div className="">
        <label htmlFor="name" className="form-label fs-lg fw-medium mb-4">
          {" "}
          Email *{" "}
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
            name="Email"
            id="Email"
            value={stepTwo.Email}
            onChange={(e) => {
              dispatch(setStepTwo({ Email: e.target.value }));
            }}
            className="form-control rounded-2"
            placeholder=""
          />
        </div>
        {stepTwo.emailInvalid && (
          <p className="text-red-500 text-sm">
            Please enter a valid email address
          </p>
        )}
      </div>
      <p className="text-gray-500 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6  !mr-2  float-left"
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
