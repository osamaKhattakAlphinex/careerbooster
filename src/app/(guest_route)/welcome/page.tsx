"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import StepOne from "@/components/welcome/StepOne";
import StepTwo from "@/components/welcome/StepTwo";
import StepThree from "@/components/welcome/StepThree";
import StepFour from "@/components/welcome/StepFour";
import StepFive from "@/components/welcome/StepFive";
import StepSix from "@/components/welcome/StepSix";
import ProfileReview from "@/components/welcome/profileReview";
import {  useDispatch, useSelector } from "react-redux";
import { setActiveStep } from "@/store/registerSlice";

const Welcome = () => {
  const router = useRouter();
  const params = useSearchParams();
  const urlStep = params?.get("step");
  // Redux
  const dispatch = useDispatch();
  const register = useSelector((state: any) => state.register);
  const reduxStep = register.activeStep;

  useEffect(() => {
    // if step exists in url and activeStep from redux is 0 then set activeStep to step
    if (reduxStep === 0 && urlStep) {
      router.push(`/welcome?step=${urlStep}`);
      dispatch(setActiveStep(Number(urlStep)));
    } else if (reduxStep === 0 && !urlStep) {
      dispatch(setActiveStep(1));
      router.push(`/welcome?step=1`);
    } else if (reduxStep !== 0) {
      router.push(`/welcome?step=${reduxStep}`);
    }
  }, [reduxStep, urlStep]);

  const isNextDisabled = () => {
    if (register.activeStep === 1 && register.stepOne.isValid === false) {
      return true;
    } else if (
      register.activeStep === 2 &&
      register.stepTwo.isValid === false
    ) {
      return true;
    } else if (
      register.activeStep === 3 &&
      register.stepThree.isValid === false
    ) {
      return true;
    } else if (
      register.activeStep === 4 &&
      register.stepFour.isValid === false
    ) {
      return true;
    } else if (
      register.activeStep === 5 &&
      register.stepFive.isValid === false
    ) {
      return true;
    } else if (
      register.activeStep === 6 &&
      register.stepSix.isValid === false
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <section className="bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 py-4 !pb-60">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {register.activeStep > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  dispatch(setActiveStep(register.activeStep - 1));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
              </button>
            )}

            {register.activeStep === 1 && <StepOne />}
            {register.activeStep === 2 && <StepTwo />}
            {register.activeStep === 3 && <StepThree />}
            {register.activeStep === 4 && <StepFour />}
            {register.activeStep === 5 && <StepFive />}
            {register.activeStep === 6 && <StepSix />}
            {register.activeStep === 7 && <ProfileReview />}

            {register.activeStep < 7 && (
              <button
                type="button"
                className="w-full flex flex-row justify-center items-center gap-2 bg-gray-900 text-white hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={isNextDisabled()}
                onClick={(e) => {
                  dispatch(setActiveStep(register.activeStep + 1));
                }}
              >
                <span>Next</span>
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
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </svg>
              </button>
            )}
            {register.activeStep === 7 && (
              <button
                type="button"
                className="w-full flex flex-row justify-center items-center gap-2 bg-gray-900 text-white hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>

                <span>Save Resume</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
