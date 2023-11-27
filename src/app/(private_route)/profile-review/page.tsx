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
import { refreshIconRotating } from "@/helpers/iconsProvider";
import axios from "axios";
import { setUserData } from "@/store/userDataSlice";

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
    <main className="flex-grow-1">
      <section className="pb-15 ">
        <div className="container">
          <div
            className="row justify-center mt-18 w-full "
            data-aos="fade-up-sm"
            data-aos-delay="50"
          >
            <div className="col-lg-8 col-xl-6">
              <div className="vstack gap-8" id="contact-form">
                <div>
                  {register.activeStep > 1 && (
                    <button
                      type="submit"
                      className="btn btn-secondary-dark"
                      onClick={(e) => {
                        dispatch(setActiveStep(register.activeStep - 1));
                      }}
                    >
                      Back
                    </button>
                  )}

                  {register.activeStep < 7 && (
                    <button
                      type="submit"
                      disabled={isNextDisabled()}
                      className="btn btn-primary-dark float-right"
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

                <div className="">
                  {register.activeStep > 1 && (
                    <button
                      type="submit"
                      className="btn btn-secondary-dark"
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
                      className="btn btn-primary-dark float-right"
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
                      className="btn btn-primary-dark float-right"
                      onClick={handleSaveDetails}
                    >
                      {register.isSubmitting ? refreshIconRotating : "Save"}
                    </button>
                  )}
                </div>
                <div className="status alert mb-0 d-none"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfileReview;
