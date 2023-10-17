import { useDispatch, useSelector } from "react-redux";
import { setStepTwo } from "@/store/registerSlice";
import { useEffect } from "react";

const StepTwo = () => {
  // Redux
  const dispatch = useDispatch();
  const stepTwo = useSelector((state: any) => state.register.stepTwo);
  const userData = useSelector((state: any) => state.userData);

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

  useEffect(() => {
    if (userData && userData.experience) {
      dispatch(
        setStepTwo({
          ...stepTwo,
          Email: userData.email,
          phoneNumber: userData.phone,
        })
      );
    }
  }, [userData]);

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
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                stroke-linejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
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
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                stroke-linejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
          </span>
          <input
            type="text"
            name="Email"
            disabled={true}
            id="Email"
            value={stepTwo.Email}
            onChange={(e) => {
              // dispatch(setStepTwo({ Email: e.target.value }));
            }}
            className="form-control rounded-2"
            placeholder=""
            title="Email can't be changed"
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
        Your contact details won{"'"}t be public and will not be shared with
        anyone.
      </p>
    </>
  );
};
export default StepTwo;
