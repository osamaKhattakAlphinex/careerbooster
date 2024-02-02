"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import StepOne from "@/components/dashboard/profileReview/StepOne";
import StepTwo from "@/components/dashboard/profileReview/StepTwo";
import StepThree from "@/components/dashboard/profileReview/StepThree";
import StepFour from "@/components/dashboard/profileReview/StepFour";
import StepFive from "@/components/dashboard/profileReview/StepFive";
import StepSix from "@/components/dashboard/profileReview/StepSix";
import ProfilePreview from "@/components/dashboard/profileReview/ProfilePreview";
import { useDispatch, useSelector } from "react-redux";
import { setActiveStep, setField } from "@/store/registerSlice";
import StepEight from "@/components/dashboard/profileReview/StepEight";
import { leftArrowIcon, refreshIconRotating } from "@/helpers/iconsProvider";
import axios from "axios";
import { setUserData } from "@/store/userDataSlice";
import "@/app/plugins.css";
import Link from "next/link";
// export const metadata: Metadata = {
//   title: "CareerBooster.Ai-Welcome",
// };

const ProfileReview = () => {
  const router = useRouter();
  const params = useSearchParams();
  const urlStep = params?.get("step");
  // Redux
  const dispatch = useDispatch();
  const register = useSelector((state: any) => state.register);
  const resume = useSelector((state: any) => state.resume);
  const userData = useSelector((state: any) => state.userData);

  const reduxStep = register.activeStep;

  const handleSaveDetails = async () => {
    dispatch(setField({ name: "isSubmitting", value: true }));
    // make an object
    const obj = {
      firstName: register.stepOne.firstName,
      lastName: register.stepOne.lastName,
      email: userData.email,
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
      wizardCompleted: true,
      wizardReviewed: true,
    };

    return axios
      .post("/api/users/updateUserData", {
        data: obj,
      })
      .then(async (resp: any) => {
        // Update user data in redux
        dispatch(setUserData(obj));
        dispatch(setActiveStep(1));

        dispatch(setField({ name: "isSubmitting", value: false }));
      })
      .finally(() => {
        router.push("/dashboard?success=1");
      });
  };

  // function to return true, false based for next button
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
    } else {
      return false;
    }
  };

  // shallow routing according to step
  useEffect(() => {
    // dispatch(setError(""));
    // if step exists in url and activeStep from redux is 0 then set activeStep to step
    if (reduxStep === 0 && urlStep) {
      router.push(`/profile-review?step=${urlStep}`);
      dispatch(setActiveStep(Number(urlStep)));
    } else if (reduxStep === 0 && !urlStep) {
      dispatch(setActiveStep(1));
      router.push(`/profile-review?step=1`);
    } else if (reduxStep !== 0) {
      router.push(`/profile-review?step=${reduxStep}`);
    }
  }, [reduxStep, urlStep]);

  return (
    <>
      <div className="ml-0 lg:ml-[234px] px-[15px] lg:mb-[72px]">
        {/* </script> */}
        <Link
          href="/dashboard"
          className="ml-2 my-4 no-underline text-[#B324D7] flex flex-row gap-2 items-center hover:text-[#E6F85E] hover:opacity-80 transition-all"
        >
          {leftArrowIcon}
          Back
        </Link>
        <main className="flex-grow-1">
          <section className="pb-15 ">
            <div className="container flex justify-center ">
              <div className=" justify-center mt-18 w-[53%]">
                <div className="">
                  <div className="gap-8">
                    <div>
                      {register.activeStep > 1 && (
                        <button
                          type="submit"
                          className=" dark:text-gray-100 text-gray-950"
                          onClick={(e) => {
                            dispatch(setActiveStep(register.activeStep - 1));
                          }}
                        >
                          Back
                        </button>
                      )}

                      {register.activeStep < 5 && (
                        <button
                          type="submit"
                          disabled={isNextDisabled()}
                          className="py-3 px-6 font-medium text-base rounded-lg  text-gray-900 !bg-[#e6f85e] float-right"
                          onClick={(e) => {
                            dispatch(setActiveStep(register.activeStep + 1));
                          }}
                        >
                          Next
                        </button>
                      )}
                    </div>
                    {register.activeStep === 1 && (
                      <>
                        {register.activeStep === 1 && (
                          <>
                            <StepOne />
                            <StepTwo />
                            <StepThree />
                          </>
                        )}
                        {/* {register.activeStep === 2 && <StepTwo />}
                    {register.activeStep === 3 && <StepThree />} */}
                      </>
                    )}
                    {register.activeStep === 2 && <StepFour />}
                    {register.activeStep === 3 && <StepFive />}

                    {register.activeStep === 4 && <StepSix />}

                    {register.activeStep === 5 && <ProfilePreview />}
                    {register.activeStep === 6 && <StepEight />}

                    <div className="my-6">
                      {register.activeStep > 1 && (
                        <button
                          type="submit"
                          className=""
                          onClick={(e) => {
                            dispatch(setActiveStep(register.activeStep - 1));
                          }}
                        >
                          Back
                        </button>
                      )}

                      {register.activeStep < 5 && (
                        <button
                          type="submit"
                          disabled={isNextDisabled()}
                          className="py-3 px-6 font-medium text-base rounded-lg  text-gray-900 !bg-[#e6f85e] float-right"
                          onClick={(e) => {
                            dispatch(setActiveStep(register.activeStep + 1));
                          }}
                        >
                          Next
                        </button>
                      )}

                      {register.activeStep === 5 && (
                        <button
                          type="submit"
                          className="py-3 px-6 mb-5 font-medium text-base rounded-lg  text-gray-900 !bg-[#e6f85e] float-right"
                          onClick={handleSaveDetails}
                        >
                          {register.isSubmitting ? refreshIconRotating : "Save"}
                        </button>
                      )}
                    </div>
                    <div className="  mb-0 "></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default ProfileReview;
