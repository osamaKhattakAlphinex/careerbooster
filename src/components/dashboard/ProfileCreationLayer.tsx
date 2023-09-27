"use client";
import { refreshBigIconRotating } from "@/helpers/iconsProvider";
import { useDispatch, useSelector } from "react-redux";
import DidYouKnowCard from "./DidYouKnowCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { makeid } from "@/helpers/makeid";
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
import Link from "next/link";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

const ProfileCreationLayer: React.FC<Props> = ({ children }) => {
  const pathname = usePathname();
  // Redux
  const userData = useSelector((state: any) => state.userData);
  const dispatch = useDispatch();
  const register = useSelector((state: any) => state.register);
  const resume = useSelector((state: any) => state.resume);

  const createProfileFromResume = async () => {
    await scrappResumeIfNotExist();
    if (register.scrappedContent) {
      await fetchBasicDataFromResume();
      await fetchEducationDataFromResume();
      await fetchExperienceDataFromResume();
      await fetchSkillsDataFromResume();
    }
  };

  // Fetch Text from CV if not already fetched
  const scrappResumeIfNotExist = async () => {
    if (register.scrappedContent === "" && userData.defaultResumeFile) {
      const resp = await fetch("/api/homepage/fetchTextFromCV", {
        method: "POST",
        body: JSON.stringify({
          file: userData.defaultResumeFile,
          folder: "resumes",
          email: userData.email,
        }),
      });
      const res = await resp.json();
      dispatch(setField({ name: "scrappedContent", value: res.text }));

      return res;
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
      };

      fetch("/api/homepage/fetchRegistrationData", {
        method: "POST",
        body: JSON.stringify(formData),
      }).then(async (resp: any) => {
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
      });
    }
  };

  const fetchEducationDataFromResume = (refetch = false) => {
    if (
      (refetch || register.scrapped.education === false) &&
      userData.defaultResumeFile &&
      register.scrappedContent !== "" &&
      register.scrapping.education === false
    ) {
      // set scrapping to true so that we don't send multiple requests
      dispatch(setScrapping({ education: true }));

      const formData = {
        // file: userData.defaultResumeFile,
        content: register.scrappedContent,
      };

      fetch("/api/homepage/fetchEducationData", {
        method: "POST",
        body: JSON.stringify(formData),
      }).then(async (resp: any) => {
        if (resp.status === 200) {
          const res = await resp.json();
          if (res.success) {
            if (res?.data) {
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
                // console.log("Error in sorting education array: ", error);
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
      });
    }
  };

  const fetchExperienceDataFromResume = (refetch = false) => {
    if (
      (refetch || register.scrapped.workExperience === false) &&
      userData.defaultResumeFile &&
      register.scrapping.workExperience === false &&
      register.scrappedContent !== ""
    ) {
      // set scrapping to true so that we don't send multiple requests
      dispatch(setScrapping({ workExperience: true }));

      const formData = {
        // file: userData.defaultResumeFile,
        content: register.scrappedContent,
      };

      fetch("/api/homepage/fetchExperienceData", {
        method: "POST",
        body: JSON.stringify(formData),
      }).then(async (resp: any) => {
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
      });
    }
  };

  const fetchSkillsDataFromResume = () => {
    if (
      register.scrapped.skills === false &&
      userData.defaultResumeFile &&
      register.scrapping.skills === false &&
      register.scrappedContent !== ""
    ) {
      dispatch(setScrapping({ skills: true }));
      const formData = {
        // file: userData.defaultResumeFile,
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
    if (userData.email && !userData.wizardCompleted) {
      createProfileFromResume();

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
    }
  }, [userData.email, userData.wizardCompleted, register.scrappedContent]);

  // RENDERING LOGIC BLOW !!!!!!

  // if the user data is still loading
  if (userData.email === "") {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-3xl font-bold text-center">Loading...</h2>
      </div>
    );
  }

  // if the user data is loaded and profile wizard is completed
  // return page content as it is
  if (userData.email && userData.wizardCompleted) {
    // if user package is not available (new user) redirect to subscribe page
    if (
      pathname !== "/subscribe" &&
      pathname !== "/subscribed" &&
      userData.userPackage &&
      Object.keys(userData.userPackage).length === 0
    ) {
      redirect("/subscribe");
    } else {
      return <>{children}</>;
    }
  } else {
    // if the user data is loaded and profile wizard is NOT completed show loader
    return (
      <div className="flex flex-col items-center justify-center h-screen py-20 !pb-42">
        <h2 className="text-3xl font-bold text-center">
          Welcome {userData?.firstName + " " + userData?.lastName}
        </h2>
        <div className="my-10">{refreshBigIconRotating}</div>
        <p className="text-center mb-4">
          Please wait while we are getting your profile ready.
        </p>
        <p className="text-center mb-10">
          Are you stuck on this page?{" "}
          <Link href="/contact" target="_blank">
            Report it
          </Link>
        </p>

        <div className="w-1/3">
          <DidYouKnowCard />
        </div>
      </div>
    );
  }
};
export default ProfileCreationLayer;
