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
  setField,
  setIsSubmitting,
  setScrapped,
  setScrapping,
  setStepFive,
  setStepFour,
  setStepOne,
  setStepSix,
  setStepThree,
  setStepTwo,
} from "@/store/registerSlice";
import StepEight from "@/components/welcome/StepEight";
import {
  refreshBigIconRotating,
  refreshIconRotating,
} from "@/helpers/iconsProvider";
import axios from "axios";
import { makeid } from "@/helpers/makeid";

const Welcome = () => {
  const router = useRouter();
  const params = useSearchParams();
  const urlStep = params?.get("step");
  // Redux
  const dispatch = useDispatch();
  const register = useSelector((state: any) => state.register);
  const resume = useSelector((state: any) => state.resume);
  const reduxStep = register.activeStep;

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
        axios
          .post("/api/auth/users", obj)
          .then(async function (response) {
            if (obj.file !== "") {
              await moveResumeToUserFolder(obj.file, obj.email);
              await updateUser(obj.file, obj.email);
            }

            await signIn("credentials", {
              email: obj.email,
              password: obj.password,
              redirect: false, // prevent default redirect
            });
            router.replace("/dashboard");
            // dispatch(setIsSubmitting(false));
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

  // file scrapping functions end
  const fetchBasicDataFromResume = async () => {
    if (
      register.scrapping.basic === false &&
      register.scrappedContent !== "" &&
      register.scrapped.basic === false &&
      resume.uploadedFileName
    ) {
      // set scrapping to true so that we don't send multiple requests
      dispatch(setScrapping({ basic: true }));

      const formData = {
        type: "basicInfo",
        // file: resume.uploadedFileName,
        content: register.scrappedContent,
      };

      fetch("/api/homepage/fetchRegistrationData", {
        method: "POST",
        body: JSON.stringify(formData),
      })
        .then(async (resp: any) => {
          if (resp.status === 200) {
            const res = await resp.json();
            if (res.success) {
              if (res?.data) {
                const data = JSON.parse(res?.data);
                dispatch(setScrapped({ basic: true }));
                dispatch(setScrapping({ basic: false }));
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
              }
            }
          } else {
            dispatch(setScrapped({ basic: true }));
            dispatch(setScrapping({ basic: false }));
          }
        })
        .finally(() => {
          fetchEducationDataFromResume();
        });
    }
  };

  const fetchEducationDataFromResume = (refetch = false) => {
    if (
      (refetch || register.scrapped.education === false) &&
      resume.uploadedFileName &&
      register.scrappedContent !== "" &&
      register.scrapping.education === false
    ) {
      // set scrapping to true so that we don't send multiple requests
      dispatch(setScrapping({ education: true }));

      const formData = {
        // file: resume.uploadedFileName,
        content: register.scrappedContent,
      };

      fetch("/api/homepage/fetchEducationData", {
        method: "POST",
        body: JSON.stringify(formData),
      })
        .then(async (resp: any) => {
          if (resp.status === 200) {
            const res = await resp.json();
            if (res.success) {
              if (res?.data) {
                const data = JSON.parse(res?.data);
                console.clear();
                console.log("Education: ", data);

                const formattedArr = data?.education.map((item: any) => {
                  return {
                    id: makeid(),
                    educationLevel: item?.educationLevel,
                    fieldOfStudy: item?.fieldOfStudy,
                    schoolName: item?.schoolName,
                    schoolLocation: item?.schoolLocation,
                    fromMonth: item?.fromMonth,
                    fromYear: item?.fromYear,
                    isContinue: item?.isContinue,
                    toMonth: item?.toMonth,
                    toYear: item?.toYear,
                  };
                });

                try {
                  // Sort the array by fromYear and fromMonth
                  formattedArr.sort((a: any, b: any) => {
                    const yearComparison = a.fromYear.localeCompare(b.fromYear);
                    if (yearComparison !== 0) {
                      return yearComparison;
                    }
                    return a.fromMonth.localeCompare(b.fromMonth);
                  });
                  formattedArr.reverse();
                } catch (error) {
                  console.log("Error in sorting education array: ", error);
                }

                dispatch(setScrapped({ education: true }));
                dispatch(setScrapping({ education: false }));
                dispatch(setStepFour({ list: formattedArr }));
              }
            }
          } else {
            dispatch(setScrapped({ education: true }));
            dispatch(setScrapping({ education: false }));
          }
        })
        .finally(() => {
          fetchExperienceDataFromResume();
        });
    }
  };

  const fetchExperienceDataFromResume = (refetch = false) => {
    if (
      (refetch || register.scrapped.workExperience === false) &&
      resume.uploadedFileName &&
      register.scrapping.workExperience === false &&
      register.scrappedContent !== ""
    ) {
      // set scrapping to true so that we don't send multiple requests
      dispatch(setScrapping({ workExperience: true }));

      const formData = {
        // file: resume.uploadedFileName,
        content: register.scrappedContent,
      };

      fetch("/api/homepage/fetchExperienceData", {
        method: "POST",
        body: JSON.stringify(formData),
      })
        .then(async (resp: any) => {
          if (resp.status === 200) {
            const res = await resp.json();

            if (res.success) {
              if (res?.data) {
                const data = JSON.parse(res?.data);
                const formattedArr = data?.experiences.map((item: any) => {
                  return {
                    id: makeid(),
                    jobTitle: item.jobTitle,
                    company: item.company,
                    country: item.country,
                    cityState: item.cityState,
                    fromMonth: item.fromMonth,
                    fromYear: item.fromYear,
                    isContinue: item.isContinue,
                    toMonth: item.toMonth,
                    toYear: item.toYear,
                    description: item.description,
                  };
                });
                // Sort the array by fromYear and fromMonth
                try {
                  formattedArr.sort((a: any, b: any) => {
                    const yearComparison = a.fromYear.localeCompare(b.fromYear);
                    if (yearComparison !== 0) {
                      return yearComparison;
                    }
                    return a.fromMonth.localeCompare(b.fromMonth);
                  });
                  formattedArr.reverse();
                } catch (error) {
                  // console.log("Error in sorting experience array: ", error);
                }

                dispatch(setScrapped({ workExperience: true }));
                dispatch(setScrapping({ workExperience: false }));
                dispatch(setStepFive({ list: formattedArr }));
              }
            }
          } else {
            dispatch(setScrapped({ workExperience: true }));
            dispatch(setScrapping({ workExperience: false }));
          }
        })
        .finally(() => {
          fetchSkillsDataFromResume();
        });
    }
  };

  const fetchSkillsDataFromResume = () => {
    if (
      register.scrapped.skills === false &&
      resume.uploadedFileName &&
      register.scrapping.skills === false &&
      register.scrappedContent !== ""
    ) {
      dispatch(setScrapping({ skills: true }));
      const formData = {
        // file: resume.uploadedFileName,
        content: register.scrappedContent,
      };

      fetch("/api/homepage/fetchSkillsData", {
        method: "POST",
        body: JSON.stringify(formData),
      }).then(async (resp: any) => {
        const res = await resp.json();

        if (res.success) {
          if (res?.data) {
            const data = JSON.parse(res?.data);
            dispatch(setScrapped({ skills: true }));
            dispatch(setScrapping({ skills: false }));
            dispatch(setStepSix({ list: data }));
          }
        }
      });
    }
  };

  // Fetch Text from CV if not already fetched
  const scrappResumeIfNotExist = async () => {
    if (register.scrappedContent === "" && resume.uploadedFileName) {
      const resp = await fetch("/api/homepage/fetchTextFromCV", {
        method: "POST",
        body: JSON.stringify({ file: resume.uploadedFileName }),
      });
      // .then(async (resp: any) => {

      // });
      const res = await resp.json();
      dispatch(setField({ name: "scrappedContent", value: res.text }));
      return res;
    }
  };

  // shallow routing according to step
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
  }, [reduxStep, urlStep]);

  // Form data fetching according to steps
  useEffect(() => {
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
  }, [reduxStep, register.scrappedContent]);

  // On First load fetch text from CV and prevent user from refreshing or leaving page with alert
  useEffect(() => {
    scrappResumeIfNotExist();
    const confirmExit = (e: any) => {
      // Display a confirmation message when leaving or refreshing the page
      e.returnValue =
        "You are leaving this page, your changes are not saved, you will lose your data.";
    };

    // Listen for the beforeunload event
    window.addEventListener("beforeunload", confirmExit);

    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener("beforeunload", confirmExit);
    };
  }, []);

  // return (
  //   <main className="flex-grow-1">
  //     <section className="py-15 pt-lg-6">
  //       <div className="container">
  //         <div
  //           className="row justify-center mt-18 w-full "
  //           data-aos="fade-up-sm"
  //           data-aos-delay="50"
  //         >
  //           <div className="col-lg-8 col-xl-6">
  //             <form
  //               className="vstack gap-8"
  //               id="contact-form"
  //               method="post"
  //               action="assets/php/contact_email.php"
  //             >
  //               <div className="">
  //                 <label
  //                   htmlFor="name"
  //                   className="form-label fs-lg fw-medium mb-4"
  //                 >
  //                   {" "}
  //                   Your name*{" "}
  //                 </label>
  //                 <div className="input-group with-icon">
  //                   <span className="icon">
  //                     <svg
  //                       xmlns="http://www.w3.org/2000/svg"
  //                       fill="none"
  //                       stroke="currentColor"
  //                       strokeLinecap="round"
  //                       strokeLinejoin="round"
  //                       strokeWidth="1.5"
  //                       viewBox="0 0 24 24"
  //                     >
  //                       <path stroke="none" d="M0 0h24v24H0z" />
  //                       <circle cx="12" cy="7" r="4" />
  //                       <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
  //                     </svg>
  //                   </span>
  //                   <input
  //                     type="text"
  //                     id="name"
  //                     name="name"
  //                     className="form-control rounded-2"
  //                     placeholder="What's your name?"
  //                     required
  //                   />
  //                 </div>
  //               </div>
  //               <div className="">
  //                 <label
  //                   htmlFor="email"
  //                   className="form-label fs-lg fw-medium mb-4"
  //                 >
  //                   Email Address*
  //                 </label>
  //                 <div className="input-group with-icon">
  //                   <span className="icon">
  //                     <svg
  //                       xmlns="http://www.w3.org/2000/svg"
  //                       fill="none"
  //                       viewBox="0 0 18 18"
  //                     >
  //                       <g
  //                         stroke="currentColor"
  //                         strokeLinecap="round"
  //                         strokeLinejoin="round"
  //                         strokeWidth="1.2"
  //                       >
  //                         <path d="M2.25 5.25a1.5 1.5 0 0 1 1.5-1.5h10.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5H3.75a1.5 1.5 0 0 1-1.5-1.5v-7.5Z" />
  //                         <path d="M2.25 5.25 9 9.75l6.75-4.5" />
  //                       </g>
  //                     </svg>
  //                   </span>
  //                   <input
  //                     type="email"
  //                     id="email"
  //                     name="email"
  //                     className="form-control rounded-2"
  //                     placeholder="Enter Your Email"
  //                     required
  //                   />
  //                 </div>
  //               </div>
  //               <div className="">
  //                 <label
  //                   htmlFor="phone"
  //                   className="form-label fs-lg fw-medium mb-4"
  //                 >
  //                   Phone Number
  //                 </label>
  //                 <div className="input-group with-icon">
  //                   <span className="icon">
  //                     <svg
  //                       xmlns="http://www.w3.org/2000/svg"
  //                       fill="none"
  //                       stroke="currentColor"
  //                       strokeLinecap="round"
  //                       strokeLinejoin="round"
  //                       strokeWidth="1.5"
  //                       viewBox="0 0 24 24"
  //                     >
  //                       <path stroke="none" d="M0 0h24v24H0z" />
  //                       <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2m10 3a2 2 0 0 1 2 2m-2-6a6 6 0 0 1 6 6" />
  //                     </svg>
  //                   </span>
  //                   <input
  //                     type="tel"
  //                     id="phone"
  //                     name="phone"
  //                     className="form-control rounded-2"
  //                     placeholder="Phone Number"
  //                   />
  //                 </div>
  //               </div>
  //               <div className="">
  //                 <label
  //                   htmlFor="message"
  //                   className="form-label fs-lg fw-medium mb-4"
  //                 >
  //                   Your Message*
  //                 </label>
  //                 <textarea
  //                   id="message"
  //                   name="message"
  //                   className="form-control rounded-2"
  //                   placeholder="Write here your details message"
  //                   rows={4}
  //                   required
  //                 ></textarea>
  //               </div>
  //               <div className="">
  //                 <button type="submit" className="btn btn-primary-dark">
  //                   Send Message
  //                 </button>
  //               </div>
  //               <div className="status alert mb-0 d-none"></div>
  //             </form>
  //           </div>
  //         </div>
  //       </div>
  //     </section>
  //   </main>
  // );

  return (
    <main className="flex-grow-1">
      <section className="py-15 pt-lg-6">
        <div className="container">
          <div
            className="row justify-center mt-18 w-full "
            data-aos="fade-up-sm"
            data-aos-delay="50"
          >
            <div className="col-lg-8 col-xl-6">
              <div className="vstack gap-8" id="contact-form">
                {(register.activeStep === 1 ||
                  register.activeStep === 2 ||
                  register.activeStep === 3) &&
                resume.uploadedFileName !== "" &&
                register.scrapped.basic === false ? (
                  <div className="flex flex-col items-center gap-4 justify-center p-10">
                    {refreshBigIconRotating}

                    <h4>
                      Please wait while AI is fetching your basic information
                      from the Resume
                    </h4>
                  </div>
                ) : (
                  <>
                    {register.activeStep === 1 && <StepOne />}
                    {register.activeStep === 2 && <StepTwo />}
                    {register.activeStep === 3 && <StepThree />}
                  </>
                )}
                {register.activeStep === 4 &&
                resume.uploadedFileName !== "" &&
                register.scrapped.education === false ? (
                  <div className="flex flex-col items-center gap-4 justify-center p-10">
                    {refreshBigIconRotating}

                    <h4>
                      Please wait while AI is fetching your education details
                      from the Resume
                    </h4>
                  </div>
                ) : (
                  <>
                    {register.activeStep === 4 && (
                      <StepFour
                        fetchEducationDataFromResume={
                          fetchEducationDataFromResume
                        }
                      />
                    )}
                  </>
                )}
                {register.activeStep === 5 &&
                resume.uploadedFileName !== "" &&
                register.scrapped.workExperience === false ? (
                  <div className="flex flex-col items-center gap-4 justify-center p-10">
                    {refreshBigIconRotating}

                    <h4>
                      Please wait while AI is fetching your work experience from
                      the Resume
                    </h4>
                  </div>
                ) : (
                  <>
                    {register.activeStep === 5 && (
                      <StepFive
                        fetchExperienceDataFromResume={
                          fetchExperienceDataFromResume
                        }
                      />
                    )}
                  </>
                )}

                {register.activeStep === 6 &&
                resume.uploadedFileName !== "" &&
                register.scrapped.skills === false ? (
                  <div className="flex flex-col items-center gap-4 justify-center p-10">
                    {refreshBigIconRotating}

                    <h4>
                      Please wait while AI is fetching your Skills from the
                      Resume
                    </h4>
                  </div>
                ) : (
                  <>{register.activeStep === 6 && <StepSix />}</>
                )}

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
                  {register.activeStep < 8 && (
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

                  {register.activeStep === 8 && (
                    <button
                      type="submit"
                      disabled={isNextDisabled()}
                      className="btn btn-primary-dark float-right"
                      onClick={handleCreateAccount}
                    >
                      {register.isSubmitting
                        ? refreshIconRotating
                        : "Create Account"}
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
  // return (
  //   <section className=" py-4 !pb-60">
  //     <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
  //       <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
  //         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
  //           {register.activeStep > 1 && (
  //             <button
  //               type="button"
  //               onClick={(e) => {
  //                 dispatch(setActiveStep(register.activeStep - 1));
  //               }}
  //             >
  //               <svg
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 fill="none"
  //                 viewBox="0 0 24 24"
  //                 strokeWidth="1.5"
  //                 stroke="currentColor"
  //                 className="w-6 h-6"
  //               >
  //                 <path
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                   d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
  //                 />
  //               </svg>
  //             </button>
  //           )}

  //           {(register.activeStep === 1 ||
  //             register.activeStep === 2 ||
  //             register.activeStep === 3) &&
  //           resume.uploadedFileName !== "" &&
  //           register.scrapped.basic === false ? (
  //             <div className="flex flex-col items-center gap-4 justify-center p-10">
  //               {refreshBigIconRotating}

  //               <h1>
  //                 Please wait while AI is fetching your basic information from
  //                 the Resume
  //               </h1>
  //             </div>
  //           ) : (
  //             <>
  //               {register.activeStep === 1 && <StepOne />}
  //               {register.activeStep === 2 && <StepTwo />}
  //               {register.activeStep === 3 && <StepThree />}
  //             </>
  //           )}
  //           {register.activeStep === 4 &&
  //           resume.uploadedFileName !== "" &&
  //           register.scrapped.education === false ? (
  //             <div className="flex flex-col items-center gap-4 justify-center p-10">
  //               {refreshBigIconRotating}

  //               <h1>
  //                 Please wait while AI is fetching your education details from
  //                 the Resume
  //               </h1>
  //             </div>
  //           ) : (
  //             <>
  //               {register.activeStep === 4 && (
  //                 <StepFour
  //                   fetchEducationDataFromResume={fetchEducationDataFromResume}
  //                 />
  //               )}
  //             </>
  //           )}
  //           {register.activeStep === 5 &&
  //           resume.uploadedFileName !== "" &&
  //           register.scrapped.workExperience === false ? (
  //             <div className="flex flex-col items-center gap-4 justify-center p-10">
  //               {refreshBigIconRotating}

  //               <h1>
  //                 Please wait while AI is fetching your work experience from the
  //                 Resume
  //               </h1>
  //             </div>
  //           ) : (
  //             <>
  //               {register.activeStep === 5 && (
  //                 <StepFive
  //                   fetchExperienceDataFromResume={
  //                     fetchExperienceDataFromResume
  //                   }
  //                 />
  //               )}
  //             </>
  //           )}

  //           {register.activeStep === 6 &&
  //           resume.uploadedFileName !== "" &&
  //           register.scrapped.skills === false ? (
  //             <div className="flex flex-col items-center gap-4 justify-center p-10">
  //               {refreshBigIconRotating}

  //               <h1>
  //                 Please wait while AI is fetching your Skills from the Resume
  //               </h1>
  //             </div>
  //           ) : (
  //             <>{register.activeStep === 6 && <StepSix />}</>
  //           )}

  //           {register.activeStep === 7 && <ProfileReview />}
  //           {register.activeStep === 8 && <StepEight />}

  //           {register.error !== "" && (
  //             <div
  //               className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 my-2"
  //               role="alert"
  //             >
  //               <p>
  //                 {register.error}
  //                 <span
  //                   onClick={() => dispatch(setError(""))}
  //                   className="font-bold float-right m-2"
  //                 >
  //                   X
  //                 </span>
  //               </p>
  //             </div>
  //           )}
  //           {register.activeStep < 8 && (
  //             <button
  //               type="button"
  //               className="w-full flex flex-row justify-center items-center gap-2 bg-gray-900 text-white hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
  //               disabled={isNextDisabled()}
  //               onClick={(e) => {
  //                 dispatch(setActiveStep(register.activeStep + 1));
  //               }}
  //             >
  //               <span>Next</span>
  //               <svg
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 fill="none"
  //                 viewBox="0 0 24 24"
  //                 strokeWidth="1.5"
  //                 stroke="currentColor"
  //                 className="w-4 h-4"
  //               >
  //                 <path
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                   d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
  //                 />
  //               </svg>
  //             </button>
  //           )}
  //           {register.activeStep === 8 && (
  //             <button
  //               type="button"
  //               disabled={isNextDisabled() || register.isSubmitting}
  //               onClick={handleCreateAccount}
  //               className="w-full flex flex-row justify-center items-center gap-2 bg-gray-900 text-white hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
  //             >
  //               {register.isSubmitting ? refreshIconRotating : checkIcon}
  //               <span>
  //                 {register.isSubmitting ? "Please wait..." : "Create Account"}
  //               </span>
  //             </button>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   </section>
  // );
};

export default Welcome;
