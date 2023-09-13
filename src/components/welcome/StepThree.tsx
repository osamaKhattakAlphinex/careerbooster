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
      <div className="">
        <label htmlFor="name" className="form-label fs-lg fw-medium mb-4">
          {" "}
          Country *{" "}
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
            name="country"
            id="country"
            value={country}
            onChange={(e) => {
              dispatch(setStepThree({ country: e.target.value }));
            }}
            className="form-control rounded-2"
            placeholder=""
          />
        </div>
      </div>

      <div className="">
        <label htmlFor="name" className="form-label fs-lg fw-medium mb-4">
          {" "}
          Street{" "}
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
            name="street"
            id="street"
            value={street}
            onChange={(e) => {
              dispatch(setStepThree({ street: e.target.value }));
            }}
            className="form-control rounded-2"
            placeholder=""
          />
        </div>
      </div>

      <div className="">
        <label htmlFor="name" className="form-label fs-lg fw-medium mb-4">
          {" "}
          City State{" "}
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
            name="cityState"
            id="cityState"
            value={cityState}
            onChange={(e) => {
              dispatch(setStepThree({ cityState: e.target.value }));
            }}
            className="form-control rounded-2"
            placeholder=""
          />
        </div>
      </div>

      <div className="">
        <label htmlFor="name" className="form-label fs-lg fw-medium mb-4">
          {" "}
          Postal Code{" "}
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
            name="postalCode"
            id="postalCode"
            value={postalCode}
            onChange={(e) => {
              dispatch(setStepThree({ postalCode: e.target.value }));
            }}
            className="form-control rounded-2"
            placeholder=""
          />
        </div>
      </div>

      <p className="text-gray-500 ">
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
