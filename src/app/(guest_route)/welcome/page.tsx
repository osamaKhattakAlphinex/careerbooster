"use client";
import { useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import StepOne from "@/components/welcome/StepOne";
import StepTwo from "@/components/welcome/StepTwo";
import StepThree from "@/components/welcome/StepThree";
import StepFour from "@/components/welcome/StepFour";
import StepFive from "@/components/welcome/StepFive";
import StepSix from "@/components/welcome/StepSix";
import ProfileReview from "@/components/welcome/profileReview";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "next-auth/react";
import {
  setActiveStep,
  setError,
  setIsSubmitting,
  setScrapped,
  setStepFive,
  setStepFour,
  setStepOne,
  setStepSix,
  setStepThree,
  setStepTwo,
} from "@/store/registerSlice";
import StepEight from "@/components/welcome/StepEight";
import { checkIcon, refreshIconRotating } from "@/helpers/iconsProvider";
import axios from "axios";
import { makeid } from "@/helpers/makeid";

const Welcome = () => {
  const router = useRouter();
  const params = useSearchParams();
  const urlStep = params?.get("step");
  // Redux
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const { register, resume } = state;
  const reduxStep = state.register.activeStep;

  useEffect(() => {
    // dispatch(setError(""));
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

    // data scraping from file
    if (
      (reduxStep === 1 || reduxStep === 2 || reduxStep === 3) &&
      resume.uploadedFileName &&
      resume.uploadedFileName !== ""
    ) {
      fetchBasicDataFromResume();
    }

    if (
      reduxStep === 4 &&
      resume.uploadedFileName &&
      resume.uploadedFileName !== ""
    ) {
      fetchEducationDataFromResume();
    }

    if (
      reduxStep === 5 &&
      resume.uploadedFileName &&
      resume.uploadedFileName !== ""
    ) {
      fetchExperienceDataFromResume();
    }

    if (
      reduxStep === 6 &&
      resume.uploadedFileName &&
      resume.uploadedFileName !== ""
    ) {
      fetchSkillsDataFromResume();
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
    } else if (
      register.activeStep === 8 &&
      (register.stepEight.isValid === false || register.terms === false)
    ) {
      return true;
    } else {
      return false;
    }
  };

  // Registration functions
  const handleCreateAccount = () => {
    if (register.terms) {
      dispatch(setIsSubmitting(true));

      const obj = {
        firstName: register.stepOne.firstName,
        lastName: register.stepOne.lastName,
        email: register.stepTwo.Email,
        password: register.stepEight.password,
        file: resume.uploadedFileName,
        phone: register.stepTwo.phoneNumber,
        contact: {
          country: register.stepThree.country,
          street: register.stepThree.street,
          cityState: register.stepThree.cityState,
          postalCode: register.stepThree.postalCode,
        },
        education: register.stepFour.list,
        experience: register.stepFive.list,
        skills: register.stepSix.list,
      };

      if (
        obj.firstName ||
        obj.lastName ||
        obj.email ||
        obj.password ||
        obj.phone
      ) {
        console.log("SUCCESS: ", obj);

        axios
          .post("/api/auth/users", obj)
          .then(async function (response) {
            if (obj.file !== "") {
              await moveResumeToUserFolder(obj.file, obj.email);
              await updateUser(obj.file, obj.email);
            }

            const res = await signIn("credentials", {
              email: obj.email,
              password: obj.password,
              redirect: false, // prevent default redirect
            });
            router.replace("/dashboard");
            dispatch(setIsSubmitting(false));
          })
          .catch(function (error) {
            dispatch(setIsSubmitting(false));
            if (error.response.data.error) {
              dispatch(setError(error.response.data.error));
            } else {
              dispatch(
                setError("Something went wrong while creating your account")
              );
            }
          });
      } else {
        dispatch(
          setError(
            `Please go back and make sure to provide all required fields`
          )
        );
        dispatch(setIsSubmitting(false));
      }
    }
  };
  const moveResumeToUserFolder = async (fileName: string, email: string) => {
    if (fileName && email) {
      const obj = {
        fileName: fileName,
        email: email,
      };
      return axios.post(`/api/users/moveResumeToUserFolder`, obj);
    }
  };
  const updateUser = (file: string, email: string) => {
    if (file && email) {
      return axios.post("/api/users/updateUser", {
        newFile: file,
        email: email,
      });
    }
  };
  // Registration Functions End

  // file scrapping functions end
  const fetchBasicDataFromResume = () => {
    if (register.scrapped.basic === false && resume.uploadedFileName) {
      const formData = {
        type: "basicInfo",
        file: resume.uploadedFileName,
      };

      fetch("/api/homepage/fetchRegistrationData", {
        method: "POST",
        body: JSON.stringify(formData),
      }).then(async (resp: any) => {
        const res = await resp.json();

        if (res.success) {
          if (res?.data?.text) {
            const data = JSON.parse(res?.data?.text);
            dispatch(
              setStepOne({
                firstName: data.firstName,
                lastName: data.lastName,
              })
            );
            dispatch(
              setStepTwo({
                phoneNumber: data.phone,
                Email: data.email,
              })
            );
            dispatch(
              setStepThree({
                country: data.country,
                street: data.street,
                cityState: data.cityState,
                postalCode: data.postalCode,
              })
            );
            dispatch(setScrapped({ basic: true }));
          }
        }
      });
    }
  };

  const fetchEducationDataFromResume = () => {
    if (register.scrapped.education === false && resume.uploadedFileName) {
      const formData = {
        file: resume.uploadedFileName,
      };

      fetch("/api/homepage/fetchEducationData", {
        method: "POST",
        body: JSON.stringify(formData),
      }).then(async (resp: any) => {
        const res = await resp.json();

        if (res.success) {
          if (res?.data?.text) {
            const data = JSON.parse(res?.data?.text);
            const formattedArr = data?.education.map((item: any) => {
              return {
                id: makeid(),
                educationLevel: item.fields.educationLevel,
                fieldOfStudy: item.fields.fieldOfStudy,
                schoolName: item.fields.schoolName,
                schoolLocation: item.fields.schoolLocation,
                fromMonth: item.fields.fromMonth,
                fromYear: item.fields.fromYear,
                isContinue: item.fields.isContinue,
                toMonth: item.fields.toMonth,
                toYear: item.fields.toYear,
              };
            });
            dispatch(setStepFour({ list: formattedArr }));
            dispatch(setScrapped({ education: true }));
          }
        }
      });
    }
  };

  const fetchExperienceDataFromResume = () => {
    if (register.scrapped.workExperience === false && resume.uploadedFileName) {
      const formData = {
        file: resume.uploadedFileName,
      };

      fetch("/api/homepage/fetchExperienceData", {
        method: "POST",
        body: JSON.stringify(formData),
      }).then(async (resp: any) => {
        const res = await resp.json();

        if (res.success) {
          if (res?.data?.text) {
            const data = JSON.parse(res?.data?.text);
            const formattedArr = data?.education.map((item: any) => {
              return {
                id: makeid(),
                jobTitle: item.fields.jobTitle,
                company: item.fields.company,
                country: item.fields.country,
                cityState: item.fields.cityState,
                fromMonth: item.fields.fromMonth,
                fromYear: item.fields.fromYear,
                isContinue: item.fields.isContinue,
                toMonth: item.fields.toMonth,
                toYear: item.fields.toYear,
                description: item.fields.description,
              };
            });
            dispatch(setStepFive({ list: formattedArr }));
            dispatch(setScrapped({ workExperience: true }));
          }
        }
      });
    }
  };

  const fetchSkillsDataFromResume = () => {
    if (register.scrapped.skills === false && resume.uploadedFileName) {
      const formData = {
        file: resume.uploadedFileName,
      };

      fetch("/api/homepage/fetchSkillsData", {
        method: "POST",
        body: JSON.stringify(formData),
      }).then(async (resp: any) => {
        const res = await resp.json();

        if (res.success) {
          if (res?.data?.text) {
            const data = JSON.parse(res?.data?.text);
            dispatch(setStepSix({ list: data.skills }));
            dispatch(setScrapped({ skills: true }));
          }
        }
      });
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
            {register.activeStep === 8 && <StepEight />}

            {register.error !== "" && (
              <div
                className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 my-2"
                role="alert"
              >
                <p>
                  {register.error}
                  <span
                    onClick={() => dispatch(setError(""))}
                    className="font-bold float-right m-2"
                  >
                    X
                  </span>
                </p>
              </div>
            )}
            {register.activeStep < 8 && (
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
            {register.activeStep === 8 && (
              <button
                type="button"
                disabled={isNextDisabled() || register.isSubmitting}
                onClick={handleCreateAccount}
                className="w-full flex flex-row justify-center items-center gap-2 bg-gray-900 text-white hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {register.isSubmitting ? refreshIconRotating : checkIcon}
                <span>
                  {register.isSubmitting ? "Please wait..." : "Create Account"}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
