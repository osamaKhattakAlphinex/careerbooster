import { useDispatch, useSelector } from "react-redux";
import { setStepOne } from "@/store/registerSlice";
import { useEffect } from "react";

const StepOne = () => {
  // Redux
  const dispatch = useDispatch();
  const stepOne = useSelector((state: any) => state.register.stepOne);
  const { firstName, lastName } = stepOne;
  const userData = useSelector((state: any) => state.userData);

  useEffect(() => {
    if (firstName && lastName) {
      dispatch(setStepOne({ isValid: true }));
    } else {
      dispatch(setStepOne({ isValid: false }));
    }
  }, [firstName, lastName]);

  useEffect(() => {
    if (userData && userData.experience) {
      dispatch(
        setStepOne({
          ...stepOne,
          firstName: userData.firstName,
          lastName: userData.lastName,
        })
      );
    }
  }, [userData]);

  return (
    <>
      <div className="">
        <label
          htmlFor="name"
          className="form-label dark:text-gray-100 text-gray-950 fs-lg fw-medium mb-4"
        >
          {" "}
          First Name *{" "}
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
            id="firstName"
            name="firstName"
            className="form-control rounded-2 "
            placeholder=""
            value={firstName}
            onChange={(e) => {
              dispatch(setStepOne({ firstName: e.target.value }));
            }}
          />
        </div>
      </div>
      <div className="">
        <label
          htmlFor="name"
          className="form-label dark:text-gray-100 text-gray-950 fs-lg fw-medium mb-4"
        >
          {" "}
          Last Name *{" "}
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
            name="lastName"
            id="lastName"
            value={lastName}
            onChange={(e) => {
              dispatch(setStepOne({ lastName: e.target.value }));
            }}
            className="form-control rounded-2 "
            placeholder=""
          />
        </div>
      </div>
    </>
  );
};
export default StepOne;
