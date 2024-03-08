"use client";
import { refreshBigIconRotating } from "@/helpers/iconsProvider";
import { useDispatch, useSelector } from "react-redux";
import DidYouKnowCard from "./DidYouKnowCard";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
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
} from "@/store/registerSlice";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { delay } from "@reduxjs/toolkit/dist/utils";
import VirtualBot from "./VirtualBot";
import { getPackageID } from "@/ServerActions";
import { setUserData } from "@/store/userDataSlice";

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
  const router = useRouter();
  const userData = useSelector((state: any) => state.userData);
  const [subscribing, setSubscribing] = useState(false);
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

  const createProfileFromResume = () => {
    if (register.scrappedContent && !userData.wizardCompleted) {
      fetchBasicDataFromResume();
      fetchEducationDataFromResume();
      fetchExperienceDataFromResume();
      fetchSkillsDataFromResume();
    }
  };

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
          fileAddress: userData.uploadedResume.fileName,
        },
      };

      fetch("/api/homepage/fetchRegistrationData", {
        method: "POST",
        body: JSON.stringify(formData),
      })
        .then(async (resp: any) => {
          const res = await resp.json();
          if (res.success) {
            if (res?.result) {
              try {
                let data;
                if (typeof res.result === "object") {
                  data = res.result;
                } else {
                  data = await JSON.parse(res.result);
                }
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
                    linkedin: data?.linkedin,
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
          const res = await resp.json();
          if (res.success) {
            if (res?.result) {
              try {
                let data;
                if (typeof res.result === "object") {
                  data = res.result;
                } else {
                  data = await JSON.parse(res.result);
                }

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
                // formattedArr.sort((a: any, b: any) => {
                //   const yearComparison = a.fromYear.localeCompare(b.fromYear);
                //   if (yearComparison !== 0) {
                //     return yearComparison;
                //   }
                //   return a.fromMonth.localeCompare(b.fromMonth);
                // });
                // formattedArr.reverse();
                formattedArr.sort((a: any, b: any) => {
                  const hasFromMonthA = a.hasOwnProperty("fromMonth");
                  const hasFromMonthB = b.hasOwnProperty("fromMonth");
                  const hasToYearA = a.hasOwnProperty("toYear");
                  const hasToYearB = b.hasOwnProperty("toYear");

                  if (
                    (hasFromMonthA && hasFromMonthB) ||
                    (hasToYearA && hasToYearB)
                  ) {
                    // Objects have either fromMonth or toYear property
                    if (hasFromMonthA && hasFromMonthB) {
                      const yearComparison = a.fromYear.localeCompare(
                        b.fromYear
                      );
                      if (yearComparison !== 0) {
                        return yearComparison;
                      }

                      const monthComparison = a.fromMonth.localeCompare(
                        b.fromMonth
                      );
                      return monthComparison;
                    } else if (
                      (!hasFromMonthA && hasFromMonthB) ||
                      (hasFromMonthA && !hasFromMonthB)
                    ) {
                      return hasFromMonthA ? -1 : 1; // Place object with fromMonth before the one without it
                    } else {
                      const fromYearComparison = a.fromYear.localeCompare(
                        b.fromYear
                      );
                      if (fromYearComparison !== 0) {
                        return fromYearComparison;
                      }

                      return hasToYearA ? -1 : 1; // Place object with toYear before the one without it
                    }
                  } else {
                    // Objects lack both fromYear and toYear properties
                    return 0; // Maintain the existing order if neither fromYear nor toYear is present
                  }
                });

                const shouldReverse = formattedArr.some(
                  (item: any) =>
                    item.hasOwnProperty("fromYear") ||
                    item.hasOwnProperty("toYear")
                );

                if (shouldReverse) {
                  formattedArr.reverse();
                }

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
          const res = await resp.json();

          if (res.success) {
            if (res?.result) {
              let data;
              if (typeof res.result === "object") {
                data = res.result;
              } else {
                data = await JSON.parse(res.result);
              }

              const experiencesWithTitle = data?.experiences;
              // loop through this array and call an api for individual one
              // if the result of an api is not done donot make call to another api

              const promises: any = [];
              experiencesWithTitle.map((experience: any, index: number) => {
                const promise = axios
                  .post("/api/homepage/fetchExperienceIndividualTrainedModel", {
                    content: register.scrappedContent,
                    jobTitle: experience?.jobTitle,
                    company: experience?.company,
                    trainBotData: {
                      userEmail: userData.email,
                      fileAddress: userData.defaultResumeFile,
                    },
                    timeout: 120000, // abort api call after 2 minutes
                  })
                  .then(async (resp: any) => {
                    const res = resp.data;
                    if (res.success) {
                      try {
                        let otherFields;
                        if (typeof res.result === "object") {
                          otherFields = res.result;
                        } else {
                          otherFields = await JSON.parse(res.result);
                        }
                        return {
                          jobTitle: experience?.jobTitle,
                          company: experience?.company,
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
                    // formattedArr.sort((a: any, b: any) => {
                    //   const yearComparison = a.fromYear.localeCompare(
                    //     b.fromYear
                    //   );
                    //   if (yearComparison !== 0) {
                    //     return yearComparison;
                    //   }
                    //   return a.fromMonth.localeCompare(b.fromMonth);
                    // });
                    // formattedArr.reverse();

                    formattedArr.sort((a: any, b: any) => {
                      const hasFromMonthA = a.hasOwnProperty("fromMonth");
                      const hasFromMonthB = b.hasOwnProperty("fromMonth");
                      const hasToYearA = a.hasOwnProperty("toYear");
                      const hasToYearB = b.hasOwnProperty("toYear");

                      if (hasFromMonthA && hasFromMonthB) {
                        // Both objects have fromMonth property
                        const yearComparison = a.fromYear.localeCompare(
                          b.fromYear
                        );
                        if (yearComparison !== 0) {
                          return yearComparison;
                        }

                        const monthComparison = a.fromMonth.localeCompare(
                          b.fromMonth
                        );
                        return monthComparison;
                      } else if (
                        (!hasFromMonthA && hasFromMonthB) ||
                        (hasFromMonthA && !hasFromMonthB)
                      ) {
                        // Only one object has fromMonth property
                        // Sort these cases based on the presence of fromMonth
                        return hasFromMonthA ? -1 : 1; // Place object with fromMonth before the one without it
                      } else {
                        // Neither object has fromMonth property
                        const fromYearComparison = a.fromYear.localeCompare(
                          b.fromYear
                        );
                        if (fromYearComparison !== 0) {
                          return fromYearComparison;
                        }

                        // Check if both objects have toYear property
                        if (hasToYearA && hasToYearB) {
                          // Compare based on toYear if fromYear is the same
                          return a.toYear.localeCompare(b.toYear);
                        } else {
                          // If only one object has toYear property, sort based on its presence
                          return hasToYearA ? -1 : 1; // Place object with toYear before the one without it
                        }
                      }
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

          if (res.success && res?.result) {
            let result;
            if (typeof res.result === "object") {
              result = res.result;
            } else {
              result = await JSON.parse(res.result);
            }
            try {
              dispatch(setScrapped({ skills: true }));
              dispatch(setScrapping({ skills: false }));
              dispatch(setStepSix({ list: result }));
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

  const updateUser = async () => {
    // Make an object
    const obj = {
      firstName: register.stepOne.firstName,
      lastName: register.stepOne.lastName,
      email: userData.email,
      linkedin: userData.linkedin,
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


  const updateUserWithFreePackage = async (
   
  ) => {
    console.log("Updating user with free package...");
    const  creditPackageId: string | undefined =await getPackageID()
    if (!subscribing && creditPackageId) {
      const creditPackage = await getCreditPackageDetails(creditPackageId);

      if (creditPackage) {
        const obj = {
          email: userData.email,
          creditPackage: creditPackage._id,
          userCredits: creditPackage.totalCredits,
          totalCredits: creditPackage.totalCredits,
        };
        // TODO!! move this code to backeND

        await axios
          .post("/api/users/updateUserData", {
            data: obj,
          })
          .then(async (resp: any) => {
            if (resp.data.success) {
              dispatch(
                setUserData({
                  ...userData,
                  creditPackage: obj.creditPackage,
                  userCredits: obj.userCredits,
                  // userPackageExpirationDate: obj.userPackageExpirationDate,
                  // userPackageUsed: obj.userPackageUsed,
                })
              );

              router.push("/dashboard");
            }
            // dispatch(setField({ name: "userPackageData", value: userPackage }));
            // TODO!!! Add new user subsription to db
            // TODO!! invalidate session on stripe
          });
      }
    }
  };

  const getCreditPackageDetails = async (creditPackageId: string) => {
    // get user package details
    const res2 = await fetch(
      `/api/users/getCreditPackageDetails?id=${creditPackageId}`
    );
    const data = await res2.json();

    if (data.success) {
      const creditPackage = data.result;
      return creditPackage;
      // set user package details to redux
    }

    return null;
  };
  // RENDERING LOGIC BLOW !!!!!!

  // if the user data is still loading
  if (userData.email === "") {
    return (
      <div className="flex flex-col items-center justify-center h-screen pt-30">
        {/* <h2 className="text-3xl font-bold text-center">Loading...</h2> */}
        <div className="fixed top-0 left-0 w-full h-screen  bg-gradient-to-bl from-[#340e53] via-[#000533] to-[#010111]  text-white  z-[9999] flex flex-col justify-center items-center">
          <Image
            src="/trans-icon1.png"
            alt="CareerBooster.AI Logo Icon"
            className="animate-ping"
            width={100}
            height={100}
          />
        </div>
      </div>
    );
  }

  // if the user data is loaded and profile wizard is completed
  // return page content as it is
  if (userData.email && userData.wizardCompleted) {
    if (
      pathname !== "/subscribe" &&
      pathname !== "/subscribed" &&
      (userData.creditPackage === "" || userData.userCredits === 0)
    ) {

      // redirect("/subscribe");
      updateUserWithFreePackage()
    } else {
      // return <div className="pt-30">{children}</div>;
      return <>{children}</>;
    }
  } else {
    /// if the user data is loaded and profile wizard is NOT completed show loader
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

        <div className="md:w-1/3 mx-2">
          <DidYouKnowCard />
        </div>
        <div className="w-full ml-auto">
          <VirtualBot
            firstName={userData.firstName}
            lastName={userData.lastName}
          />
        </div>
      </div>
    );
  }
};
export default ProfileCreationLayer;
