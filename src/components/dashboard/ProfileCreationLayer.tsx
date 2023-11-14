"use client";
import { refreshBigIconRotating } from "@/helpers/iconsProvider";
import { useDispatch, useSelector } from "react-redux";
import DidYouKnowCard from "./DidYouKnowCard";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import { makeid } from "@/helpers/makeid";
import {
  setScrapped,
  setScrapping,
  setStepFive,
  setStepFour,
  setStepOne,
  setStepSix,
  setStepThree,
  setStepTwo,
  setField,
} from "@/store/registerSlice";
import Link from "next/link";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

// to Remove special characters from string
function removeSpecialChars(str: string) {
  // Remove new lines
  str = str.replace(/[\r\n]+/gm, "");

  // Remove Unicode characters
  str = str.replace(/[^\x00-\x7F]/g, "");

  // Remove icons
  str = str.replace(/[^\w\s]/gi, "");

  return str;
}

const ProfileCreationLayer: React.FC<Props> = ({ children }) => {
  const pathname = usePathname();
  // Redux
  const userData = useSelector((state: any) => state.userData);
  const dispatch = useDispatch();
  const register = useSelector((state: any) => state.register);
  const resume = useSelector((state: any) => state.resume);
  const [showStuckError, setShowStuckError] = useState(false);

  // useeffect to show stuck error to true after 2 minutes
  useEffect(() => {
    const t = setTimeout(() => {
      setShowStuckError(true);
    }, 120000);
    return () => clearTimeout(t);
  }, []);

  //useCallback in order to not call function again and again
  // const createProfileFromResume = useCallback(() => {

  // }, []);
  const createProfileFromResume = () => {
    if (register.scrappedContent && !userData.wizardCompleted) {
      fetchBasicDataFromResume();
      fetchEducationDataFromResume();
      fetchExperienceDataFromResume();
      fetchSkillsDataFromResume();
    }
  };
  // const createProfileFromResume = async () => {
  //   // await scrappResumeIfNotExist();
  //   if (register.scrappedContent) {
  //     fetchBasicDataFromResume();
  //     fetchEducationDataFromResume();
  //     fetchExperienceDataFromResume();
  //     fetchSkillsDataFromResume();
  //   }
  // };

  // Fetch Text from CV if not already fetched
  // const scrappResumeIfNotExist = async () => {
  //   if (register.scrappedContent === "" && userData.defaultResumeFile) {
  //     const resp = await fetch("/api/homepage/fetchTextFromCV", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         file: userData.defaultResumeFile,
  //         folder: "resumes",
  //         email: userData.email,
  //       }),
  //     });
  //     const res = await resp.json();

  //     const cleanText = removeSpecialChars(res.text);
  //     dispatch(setField({ name: "scrappedContent", value: cleanText }));

  //     return res;
  //   }
  // };

  const fetchBasicDataFromResume = async () => {
    if (
      register.scrapping.basic === false &&
      register.scrappedContent !== "" &&
      register.scrapped.basic === false
    ) {
      // set scrapping to true so that we don't send multiple requests
      dispatch(setScrapping({ basic: true }));

      const formData = {
        type: "basicInfo",
        // file: userData.defaultResumeFile,
        content: register.scrappedContent,
        trainBotData: {
          userEmail: userData.email,
          fileAddress: userData.defaultResumeFile,
        },
      };

      fetch("/api/homepage/fetchRegistrationData", {
        method: "POST",
        body: JSON.stringify(formData),
      })
        .then(async (resp: any) => {
          if (resp.success) {
            const res = await resp.json();
            if (res.success && res?.data) {
              try {
                const data = JSON.parse(res?.data);
                dispatch(setScrapped({ basic: true }));
                dispatch(setScrapping({ basic: false }));
                dispatch(
                  setStepOne({
                    firstName: data?.firstName,
                    lastName: data?.lastName,
                  })
                );
                dispatch(
                  setStepTwo({
                    phoneNumber: data?.phone,
                    Email: data?.email,
                  })
                );
                dispatch(
                  setStepThree({
                    country: data?.country,
                    street: data?.street,
                    cityState: data?.cityState,
                    postalCode: data?.postalCode,
                  })
                );
              } catch (error) {
                dispatch(setScrapped({ basic: true }));
                dispatch(setScrapping({ basic: false }));
              }
            } else {
              dispatch(setScrapped({ basic: true }));
              dispatch(setScrapping({ basic: false }));
            }
          } else {
            dispatch(setScrapped({ basic: true }));
            dispatch(setScrapping({ basic: false }));
          }
        })
        .catch((error) => {
          dispatch(setScrapped({ basic: true }));
          dispatch(setScrapping({ basic: false }));
        });
    }
  };

  const fetchEducationDataFromResume = (refetch = false) => {
    if (
      (refetch || register.scrapped.education === false) &&
      // userData.defaultResumeFile &&
      register.scrappedContent !== "" &&
      register.scrapping.education === false
    ) {
      // set scrapping to true so that we Don't send multiple requests
      dispatch(setScrapping({ education: true }));

      const formData = {
        // file: userData.defaultResumeFile,
        content: register.scrappedContent,
        trainBotData: {
          userEmail: userData.email,
          fileAddress: userData.defaultResumeFile,
        },
      };

      fetch("/api/homepage/fetchEducationData", {
        method: "POST",
        body: JSON.stringify(formData),
      })
        .then(async (resp: any) => {
          if (resp.status === 200) {
            const res = await resp.json();

            if (res.success && res?.data) {
              try {
                const data = JSON.parse(res?.data);

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
                // Sort the array by fromYear and fromMonth
                formattedArr.sort((a: any, b: any) => {
                  const yearComparison = a.fromYear.localeCompare(b.fromYear);
                  if (yearComparison !== 0) {
                    return yearComparison;
                  }
                  return a.fromMonth.localeCompare(b.fromMonth);
                });
                formattedArr.reverse();

                dispatch(setStepFour({ list: formattedArr }));
                dispatch(setScrapped({ education: true }));
                dispatch(setScrapping({ education: false }));
              } catch (error) {
                // console.log("Error in sorting education array: ", error);
                dispatch(setScrapped({ education: true }));
                dispatch(setScrapping({ education: false }));
              }
            } else {
              dispatch(setScrapped({ education: true }));
              dispatch(setScrapping({ education: false }));
            }
          } else {
            dispatch(setScrapped({ education: true }));
            dispatch(setScrapping({ education: false }));
          }
        })
        .catch((error) => {
          dispatch(setScrapped({ education: true }));
          dispatch(setScrapping({ education: false }));
        });
    }
  };

  const fetchExperienceDataFromResume = (refetch = false) => {
    if (
      (refetch || register.scrapped.workExperience === false) &&
      // userData.defaultResumeFile &&
      register.scrapping.workExperience === false &&
      register.scrappedContent !== ""
    ) {
      // set scrapping to true so that we don't send multiple requests
      dispatch(setScrapping({ workExperience: true }));

      const formData = {
        // file: userData.defaultResumeFile,
        content: register.scrappedContent,
        trainBotData: {
          userEmail: userData.email,
          fileAddress: userData.defaultResumeFile,
        },
      };

      fetch("/api/homepage/fetchExperienceData", {
        method: "POST",
        body: JSON.stringify(formData),
      })
        .then(async (resp: any) => {
          if (resp.status === 200) {
            const res = await resp.json();

            if (res.success && res?.data) {
              const data = JSON.parse(res?.data);

              const experiencesWithTitle = data?.experiences;

              // loop through this array and call an api for individual one
              // if the result of an api is not done donot make call to another api

              const promises: any = [];
              experiencesWithTitle.map((experince: any, index: number) => {
                const promise = axios
                  .post("/api/homepage/fetchExperienceIndividualTrainedModel", {
                    content: register.scrappedContent,
                    jobTitle: experince?.jobTitle,
                    company: experince?.company,
                    trainBotData: {
                      userEmail: userData.email,
                      fileAddress: userData.defaultResumeFile,
                    },
                    timeout: 120000, // abort api call after 2 minutes
                  })
                  .then((resp: any) => {
                    if (resp.status === 200) {
                      try {
                        const otherFields = JSON.parse(resp?.data?.data);

                        return {
                          jobTitle: experince?.jobTitle,
                          company: experince?.company,
                          ...otherFields,
                        };
                      } catch (error) {
                        // skip this promise
                      }
                    }
                  });

                promises.push(promise);
              });

              let completeExperiences: any = [];
              // wait for all the promises in the promises array to resolve
              Promise.all(promises)
                .then((results) => {
                  completeExperiences = results;

                  const formattedArr = completeExperiences.map((item: any) => {
                    return {
                      id: makeid(),
                      jobTitle: item?.jobTitle,
                      company: item?.company,
                      country: item?.country,
                      cityState: item?.cityState,
                      fromMonth: item?.fromMonth,
                      fromYear: item?.fromYear,
                      isContinue: item?.isContinue,
                      toMonth: item?.toMonth,
                      toYear: item?.toYear,
                      description: item?.description,
                    };
                  });
                  // Sort the array by fromYear and fromMonth
                  try {
                    formattedArr.sort((a: any, b: any) => {
                      const yearComparison = a.fromYear.localeCompare(
                        b.fromYear
                      );
                      if (yearComparison !== 0) {
                        return yearComparison;
                      }
                      return a.fromMonth.localeCompare(b.fromMonth);
                    });
                    formattedArr.reverse();
                  } catch (error) {
                    // console.log("Error in sorting experience array: ", error);
                  }
                  // console.log("formattedArr: ", formattedArr);

                  dispatch(setStepFive({ list: formattedArr }));
                  dispatch(setScrapped({ workExperience: true }));
                  dispatch(setScrapping({ workExperience: false }));
                })
                .catch(() => {
                  dispatch(setScrapped({ workExperience: true }));
                  dispatch(setScrapping({ workExperience: false }));
                });
            } else {
              dispatch(setScrapped({ workExperience: true }));
              dispatch(setScrapping({ workExperience: false }));
            }
          } else {
            dispatch(setScrapped({ workExperience: true }));
            dispatch(setScrapping({ workExperience: false }));
          }
        })
        .catch((err) => {
          dispatch(setScrapped({ workExperience: true }));
          dispatch(setScrapping({ workExperience: false }));
        });
    }
  };

  const fetchSkillsDataFromResume = () => {
    if (
      register.scrapped.skills === false &&
      // userData.defaultResumeFile &&
      register.scrapping.skills === false &&
      register.scrappedContent !== ""
    ) {
      dispatch(setScrapping({ skills: true }));
      const formData = {
        // file: userData.defaultResumeFile,
        content: register.scrappedContent,
        trainBotData: {
          userEmail: userData.email,
          fileAddress: userData.defaultResumeFile,
        },
      };

      fetch("/api/homepage/fetchSkillsData", {
        method: "POST",
        body: JSON.stringify(formData),
      })
        .then(async (resp: any) => {
          const res = await resp.json();

          if (res.success && res?.data) {
            try {
              const data = JSON.parse(res?.data);
              dispatch(setScrapped({ skills: true }));
              dispatch(setScrapping({ skills: false }));
              dispatch(setStepSix({ list: data }));
            } catch (error) {
              dispatch(setScrapped({ skills: true }));
              dispatch(setScrapping({ skills: false }));
            }
          } else {
            dispatch(setScrapped({ skills: true }));
            dispatch(setScrapping({ skills: false }));
          }
        })
        .catch((error) => {
          dispatch(setScrapped({ skills: true }));
          dispatch(setScrapping({ skills: false }));
        });
    }
  };

  // laksjdflasjdfl
  const updateUser = async () => {
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
    };

    return axios
      .post("/api/users/updateUserData", {
        data: obj,
      })
      .then(async (resp: any) => {
        if (window) {
          window.location.reload();
        }
      });
  };

  // watch scrapped data and if all scrapped data is scrapped
  useEffect(() => {
    if (
      register.scrapped.basic &&
      register.scrapped.education &&
      register.scrapped.workExperience &&
      register.scrapped.skills
    ) {
      updateUser();
    }
  }, [register.scrapped]);

  // if the user data loaded, data scrapped, profile wizard isn't completed Make profile from resume
  useEffect(() => {
    if (userData.email !== "") {
      createProfileFromResume();
    }
    // const confirmExit = (e: any) => {
    //   // Display a confirmation message when leaving or refreshing the page
    //   e.returnValue =
    //     "You are leaving this page, your changes are not saved, you will lose your data.";
    // };

    // // Listen for the beforeunload event
    // window.addEventListener("beforeunload", confirmExit);

    // return () => {
    //   // Remove the event listener when the component unmounts
    //   window.removeEventListener("beforeunload", confirmExit);
    // };
  }, [userData.email]);

  // RENDERING LOGIC BLOW !!!!!!

  // if the user data is still loading
  if (userData.email === "") {
    return (
      <div className="flex flex-col items-center justify-center h-screen pt-30">
        <h2 className="text-3xl font-bold text-center">Loading...</h2>
      </div>
    );
  }

  // if the user data is loaded and profile wizard is completed
  // return page content as it is
  if (userData.email && userData.wizardCompleted) {
    // if user package is not available (new user) redirect to subscribe page
    // or if user package is expired
    if (
      pathname !== "/subscribe" &&
      pathname !== "/subscribed" &&
      new Date(userData.userPackageExpirationDate) < new Date()
    ) {
      ("/subscribe?expired=1");
    }
    if (
      pathname !== "/subscribe" &&
      pathname !== "/subscribed" &&
      (!userData.userPackage ||
        userData.userPackage === "" ||
        !userData.userPackageExpirationDate)
    ) {
      redirect("/subscribe");
    } else {
      return <div className="pt-30">{children}</div>;
    }
  } else {
    // if the user data is loaded and profile wizard is NOT completed show loader
    return (
      <div className="flex flex-col items-center justify-center h-screen pt-30 !pb-42">
        <h2 className="text-3xl font-bold text-center">
          Welcome {userData?.firstName + " " + userData?.lastName}
        </h2>
        <div className="my-10">{refreshBigIconRotating}</div>
        <p className="text-center mb-4">
          Please wait! We are scanning your resume.
        </p>
        {showStuckError && (
          <p className="text-center mb-10">
            Stuck on this page for longer than expected? &nbsp;
            <Link href="/contact" target="_blank">
              Click here
            </Link>
            &nbsp; to report the issue for a quick fix
          </p>
        )}

        <div className="w-1/3">
          <DidYouKnowCard />
        </div>
      </div>
    );
  }
};
export default ProfileCreationLayer;
