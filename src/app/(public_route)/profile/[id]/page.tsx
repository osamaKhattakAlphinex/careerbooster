"use client";
import ProfileResume from "@/components/public-pages/ProfileResume";
import { RootState } from "@/store/store";
import { pdf } from "@react-pdf/renderer";
import Image from "next/image";
import Link from "next/link";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { saveAs } from "file-saver";
import {
  linkedInIconFilled,
  refreshIconRotating,
} from "@/helpers/iconsProvider";
import { formatStringWithCommas } from "@/helpers/DateRangeFilter";
import { useFormik } from "formik";
import axios from "axios";
import { setField } from "@/store/userDataSlice";
const Page = ({ params }: { params: { id: string } }) => {
  const [active, setActive] = useState("education-card");
  const userDetails = useSelector((state: RootState) => state.userData);
  const [userData, setUserData] = useState(userDetails);
  const [userFetched, setUserFetched] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isEmployer, setIsEmployer] = useState("");
  const [open, setOpen] = useState(false);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      desiredJobTitle: "",
      expectedSalary: "",
      prefferedLocation: "",
    },
    onSubmit: async (values) => {
      axios
        .post("/api/users/updateUserData", {
          data: {
            ...userData,
            desiredJobTitle: values.desiredJobTitle,
            expectedSalary: values.expectedSalary,
            locationPreference: values.prefferedLocation,
          },
        })
        .then((resp) => {
          console.log("user Updated Successfully");
          dispatch(
            setField({ name: "expectedSalary", value: values.expectedSalary })
          );
          dispatch(
            setField({ name: "desiredJobTitle", value: values.desiredJobTitle })
          );
          dispatch(
            setField({
              name: "locationPreference",
              value: values.prefferedLocation,
            })
          );

          formik.resetForm();

          setOpen(false);
          setIsUpdateFormOpen(false);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    validationSchema: Yup.object({
      desiredJobTitle: Yup.string().required("Job Title is required"),
      expectedSalary: Yup.string().required("Expected Salary is required"),
      prefferedLocation: Yup.string().required(
        "Preferred Location is required"
      ),
    }),
  });

  useEffect(() => {
    if (isUpdateFormOpen) {
      formik.setFieldValue("desiredJobTitle", userData.desiredJobTitle);
      formik.setFieldValue("expectedSalary", userData.expectedSalary);
      formik.setFieldValue("prefferedLocation", userData.locationPreference);
      setIsEmployer("Yes");
      setOpen(true);
    }
  }, [isUpdateFormOpen]);
  const generateSummaryForProfile = () => {
    const formData = {
      content: userData.uploadedResume.fileContent,
      trainBotData: {
        userEmail: userData.email,
        fileAddress: userData.defaultResumeFile,
      },
    };

    fetch("/api/homepage/writeSummary", {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then(async (resp) => {
        const res = await resp.json();
        if (res.success) {
          if (res.result) {
            dispatch(setField({ name: "summary", value: res.result }));
            setUserData((prev) => {
              return {
                ...prev,
                summary: res.result,
              };
            });
            await axios.post("/api/users/updateUserData", {
              data: {
                ...userData,
                summary: res.result,
              },
            });
          }
        }
      })
      .catch((error) => {});
  };

  useEffect(() => {
    if (userDetails._id) {
      setUserData(userDetails);
      setUserFetched(true);
    }
    if (userDetails._id && params.id === userDetails._id) {
      setLoading(true);
      fetch(`/api/users/${params.id}`, {
        method: "GET",
      })
        .then(async (response) => {
          const res = await response.json();
          if (res.success) {
            setUserFetched(true);
            setUserData(res.user);
          }
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userDetails]);

  const downloadPdf = async () => {
    const fileName = `${userData.firstName}.pdf`;
    const blob = await pdf(<ProfileResume userData={userData} />).toBlob();
    saveAs(blob, fileName);
  };
 
  if (!userDetails._id || params.id !== userDetails._id) {
     if (userDetails.isLoading) {
    return (
      <div className=" flex flex-col xs:mt-[90px] lg:mt-52 md:mt-28 md:px-20 xs:px-4 xs:text-center mb-10">
        <span className=" text-[#6a4dff] dark:text-[#e6f85e] text-[20px] mx-auto">
          {refreshIconRotating}
        </span>
      </div>
    );
  }else {
    return (
      <div className=" flex flex-col xs:mt-[90px] lg:mt-52 md:mt-28 md:px-20 xs:px-4 xs:text-center mb-10">
        <span className=" text-[#6a4dff] dark:text-[#e6f85e] text-[20px] ">
          You Don{"'"}t Have Access To This Page
        </span>
      </div>
    );
  }
  }

  return (
    <div className=" flex flex-col xs:mt-[90px] lg:mt-52 md:mt-28 md:px-20 xs:px-4 xs:text-center md:text-left">
      {/* {hero-section} */}
      {userFetched ? (
        <>
          <div className="flex md:flex-row xs:flex-col w-full justify-between items-center ">
            <div className="flex flex-col gap-3 xs:w-full md:w-1/2">
              <h2 className="md:text-[28px] xs:text-[24px]">
                HEY, I AM{" "}
                <span className="dark:text-[#E0E360] text-blue-400">
                  {userData?.firstName + " " + userData?.lastName}
                </span>
              </h2>

              <h1 className="md:text-[36px] xs:text-[30px] font-bold text-[#BE4A86]">
                {userData?.experience?.[0]?.jobTitle}
              </h1>

              <ul className="flex items-center gap-3 xs:text-center md:text-left xs:mx-auto md:mx-0 ">
                <li>{userData.email}</li>
                <li>
                  <Link
                    className={`underline${
                      userDetails.linkedin ? "block" : "hidden"
                    }`}
                    href={`${userData.linkedin}`}
                  >
                    {linkedInIconFilled}
                  </Link>
                </li>
                {/* <li>{userData.phone}</li> */}
              </ul>
              <div className="flex items-center gap-3 mt-4">
                {" "}
                <button
                  className="rounded-full w-fit px-4 py-2 md:text-[18px] xs:text[15px]  dark:hover:bg-transparent dark:hover:border dark:hover:border-[#E0E360] dark:hover:text-gray-100 hover:bg-transparent hover:border hover:border-blue-400 hover:text-gray-900 dark:text-gray-900  dark:bg-[#E0E360] bg-blue-500 text-gray-100 xs:mx-auto md:mx-0"
                  onClick={downloadPdf}
                >
                  Download Profile
                </button>
                <h2 className="md:text-[18px] xs:text[15px] ">OR</h2>
                <Link
                  target="_blank"
                  href="/profile-review"
                  className="rounded-full w-fit px-4 py-2 md:text-[18px] xs:text[15px] dark:hover:bg-transparent dark:hover:border dark:hover:border-[#E0E360] dark:hover:text-gray-100 hover:bg-transparent hover:border hover:border-blue-400 hover:text-gray-900 dark:text-gray-900  dark:bg-[#E0E360] bg-blue-500 text-gray-100 xs:mx-auto md:mx-0"
                >
                  Edit Profile
                </Link>
              </div>
            </div>
            <div className="w-1/2 xs:hidden md:block ">
              {userData.profileImage ? (
                <Image
                  className="rounded-[200px] mx-auto"
                  src={`${userData?.profileImage}`}
                  width={300}
                  height={300}
                  alt="profile-image"
                />
              ) : (
                <Image
                  className="rounded-[200px] mx-auto"
                  src={`/assets/images/default.png`}
                  width={300}
                  height={300}
                  alt="profile-image"
                />
              )}
            </div>
          </div>

          {userDetails.desiredJobTitle ? (
            <div className="flex flex-col lg:w-[90%] xs:w-full xs:mt-6 md:mt-16 mx-auto  gap-2 rounded-md dark:bg-gray-900 bg-gray-100">
              <div
                className="md:w-[40px] xs:w-[20px] ml-auto pt-4 md:pr-4 xs:mr-4 md:mr-0"
                onClick={() => {
                  setIsUpdateFormOpen(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </div>

              <div className="md:py-8 xs:py-4 px-4 text-center md:flex-row xs:flex-col  flex ">
                <div className="salary flex md:flex-col xs:flex-row gap-4 md:w-1/3 xs:w-full items-center">
                  <h1 className="dark:text-gray-100 text-gray-950 lg:text-[26px] xs:text-[20px] font-semibold">
                    Expected Salary (in $)
                  </h1>
                  <span className="xs:block md:hidden text-[18px] font-bold">
                    -
                  </span>
                  <h1 className="dark:text-gray-100 text-gray-950 lg:text-[20px] md:text-[16px]">
                    {userData.expectedSalary
                      ? formatStringWithCommas(userData.expectedSalary)
                      : "Not Specified"}
                  </h1>
                </div>
                <div className="jobTitle flex md:flex-col xs:flex-row gap-4 md:w-1/3 xs:w-full items-center">
                  <h1 className="dark:text-gray-100 text-gray-950 lg:text-[26px] xs:text-[20px] font-semibold">
                    Desired Job Title
                  </h1>
                  <span className="xs:block md:hidden text-[18px] font-bold">
                    -
                  </span>
                  <h1 className="dark:text-gray-100 text-gray-950 lg:text-[20px] md:text-[16px]">
                    {userData.desiredJobTitle
                      ? userData.desiredJobTitle
                      : "Not Specified"}
                  </h1>
                </div>
                <div className="Location flex md:flex-col xs:flex-row gap-4 md:w-1/3 xs:w-full items-center">
                  <h1 className="dark:text-gray-100 text-gray-950 lg:text-[26px] xs:text-[20px] font-semibold">
                    Preferred Location
                  </h1>
                  <span className="xs:block md:hidden text-[18px] font-bold">
                    -
                  </span>
                  <h1 className="dark:text-gray-100 text-gray-950 lg:text-[20px] md:text-[16px]">
                    {userData.locationPreference
                      ? userData.locationPreference
                      : "Not Specified"}
                  </h1>
                </div>
              </div>
            </div>
          ) : (
            <div
              className={` flex-col text-center mt-12 ${
                isEmployer === "No" ? "hidden" : "flex"
              }`}
            >
              <div className="md:flex-row flex xs:flex-col items-center gap-4 mx-auto mt-6">
                <h1 className="text-center font-semibold text-[30px] ">
                  Are You A Job Seeker ?
                </h1>
                <div className="flex gap-4">
                  {" "}
                  <button
                    onClick={() => {
                      setIsEmployer("Yes");
                      setOpen(true);
                    }}
                    className="w-fit px-4 py-1 rounded-lg bg-blue-600 text-gray-100 text-[16px]"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => {
                      setIsEmployer("No");
                    }}
                    className="w-fit px-4 py-1 rounded-lg bg-blue-600 text-gray-100 text-[16px]"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
          {isEmployer === "Yes" && (
            <div
              id="authentication-modal"
              aria-hidden="true"
              className={`${
                open ? "flex" : "hidden"
              } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center bg-white  bg-opacity-5 backdrop-blur-sm  w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
            >
              <div className="relative p-4 w-full  max-h-full">
                {/* <!-- Modal content --> */}
                <div className="relative bg-white rounded-lg shadow pb-20 dark:bg-gray-700 max-w-3xl mx-auto">
                  {/* <!-- Modal header --> */}
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 ">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white ">
                      Update Your Profile
                    </h3>
                    <button
                      type="button"
                      className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-hide="authentication-modal"
                      onClick={() => {
                        setIsUpdateFormOpen(false);
                        setOpen(false);
                      }}
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  {/* <!-- Modal body --> */}
                  <form onSubmit={formik.handleSubmit}>
                    <div className="my-2 text-start mt-10">
                      <div className="relative flex flex-wrap items-stretch w-[70%] mb-6 mx-auto ">
                        <span className="absolute flex items-center justify-center w-12 h-12 transform -translate-y-1/2 z-1000 top-1/2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                        </span>

                        <input
                          type="text"
                          name="expectedSalary"
                          className="block outline-none focus:border-blue-400 dark:bg-transparent rounded-lg pr-[1.5rem] py-4 pl-[3rem] text-base w-full border-[1px] border-[#bdbfd4] bg-transparent bg-clip"
                          placeholder="Expected Salary Per Annum (in $)"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.expectedSalary}
                        />
                      </div>
                      {formik.touched.expectedSalary &&
                        formik.errors.expectedSalary && (
                          <p className=" text-red-600 mx-auto w-fit">
                            {formik.touched.expectedSalary &&
                              formik.errors.expectedSalary}
                          </p>
                        )}
                    </div>
                    <div className="my-2 text-start">
                      <div className="relative flex flex-wrap items-stretch w-[70%] mb-6 mx-auto ">
                        <span className="absolute flex items-center justify-center w-12 h-12 transform -translate-y-1/2 z-1000 top-1/2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                            />
                          </svg>
                        </span>

                        <input
                          type="text"
                          name="desiredJobTitle"
                          className="block outline-none focus:border-blue-400 dark:bg-transparent rounded-lg pr-[1.5rem] py-4 pl-[3rem] text-base w-full border-[1px] border-[#bdbfd4] bg-transparent bg-clip"
                          placeholder="Desired Job Title"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.desiredJobTitle}
                        />
                      </div>
                      {formik.touched.desiredJobTitle &&
                        formik.errors.desiredJobTitle && (
                          <p className=" text-red-600 mx-auto w-fit">
                            {formik.touched.desiredJobTitle &&
                              formik.errors.desiredJobTitle}
                          </p>
                        )}
                    </div>
                    <div className="my-2 text-start">
                      <div className="relative flex flex-wrap items-stretch w-[70%] mb-6 mx-auto ">
                        <span className="absolute flex items-center justify-center w-12 h-12 transform -translate-y-1/2 z-1000 top-1/2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                            />
                          </svg>
                        </span>

                        <input
                          type="text"
                          name="prefferedLocation"
                          className="block outline-none focus:border-blue-400 dark:bg-transparent rounded-lg pr-[1.5rem] py-4 pl-[3rem] text-base w-full border-[1px] border-[#bdbfd4] bg-transparent bg-clip"
                          placeholder="Preferred Location"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.prefferedLocation}
                        />
                      </div>
                      {formik.touched.prefferedLocation &&
                        formik.errors.prefferedLocation && (
                          <p className=" text-red-600 mx-auto w-fit">
                            {formik.touched.prefferedLocation &&
                              formik.errors.prefferedLocation}
                          </p>
                        )}
                    </div>
                    <button className="bg-blue-600 rounded-md px-4 py-2 justify-center flex text-gray-100 md:text-[20px] xs:text-[16px] w-fit mx-auto">
                      Update Profile
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
          {userData.summary ? (
            <div className="flex flex-col lg:w-[90%] xs:w-full xs:mt-6 md:mt-20 mx-auto  gap-2 rounded-md dark:bg-gray-900 bg-gray-100 p-8">
              <h1 className="font-bold md:text-[30px] xs:text-[20px] text-center uppercase">
                Summmary
              </h1>
              <span className="text-center md:w-[60px] xs:w-[30px] h-2 border-b-[4px] mx-auto border-green-400 mb-4"></span>
              <p className="md:text-[20px] xs:text-[16px]">
                {userData.summary}
              </p>
            </div>
          ) : (
            <button
              className="rounded-full bg-blue-600 mt-10 mx-auto text-gray-100 px-4 py-2 w-fit"
              onClick={() => generateSummaryForProfile()}
            >
              Generate Profile Summary
            </button>
          )}
          {/* skills-section */}
          <div className="flex w-full flex-col md:py-16 xs:py-6">
            <h1 className="md:text-[36px] xs:text-[30px] font-bold text-center mb-6">
              Skills
            </h1>
            <div className="flex flex-row items-center flex-wrap gap-3 md:w-[75%] xs:w-full mx-auto text-center justify-center">
              {userData?.skills
                ? userData?.skills.map((skill: string, index: number) => {
                    return (
                      <span
                        key={index}
                        className=" rounded-xl xs:text-[16px] md:text-[18px] capitalize w-fit md:py-3 md:px-5 xs:p-2 dark:bg-gray-400 bg-gray-200 text-gray-900"
                      >
                        {skill}
                      </span>
                    );
                  })
                : "No Skill Found In your resume"}
            </div>
          </div>
          {/* Education and Experience tabs */}

          <div className="md:text-[26px] xs:text-[22px] font-medium text-center text-gray-500 border border-gray-200 dark:text-gray-400 dark:border-gray-700 md:w-[80%] mx-auto md:my-10 xs:mb-10 rounded-lg xs:w-full">
            <ul className="flex  w-full justify-between  -mb-px">
              <li className="me-2 md:w-1/2  md:ml-auto">
                <button
                  onClick={() => {
                    setActive("education-card");
                  }}
                  className={`inline-block p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                    active === "education-card"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : ""
                  }`}
                >
                  Experience
                </button>
              </li>
              <li className="me-2 md:w-1/2 ">
                <button
                  onClick={() => {
                    setActive("experience-card");
                  }}
                  className={`inline-block p-4  rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                    active !== "education-card"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : ""
                  } `}
                  aria-current="page"
                >
                  Education
                </button>
              </li>
            </ul>
          </div>

          {/* Education Cards */}
          {active === "education-card" && (
            <div className={` w-full flex`}>
              <ul
                id="education-card "
                className="md:my-8 rounded-md shadow-2xl md:p-10 xs:p-4 lg:full xs:w-full dark:bg-gray-900 bg-gray-200"
              >
                {userData?.experience?.map((experience) => {
                  return (
                    <>
                      <li className="mb-6 flex gap-4 ">
                        <div className="relative md:flex md:flex-col items-center mt-[10px] xs:hidden">
                          <div className="absolute w-[2px] dark:bg-[#E0E360] bg-blue-400 h-[115%]"></div>
                          <div className="flex items-center justify-center w-4 h-4 dark:bg-[#E0E360] bg-blue-400 rounded-full">
                            <span className="text-white"></span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <h1 className="md:text-[28px] xs:text-[22px] font-medium">
                            {experience.jobTitle}
                          </h1>
                          <h2 className="md:text-[18px] xs:text-[15px]  font-medium ">
                            {experience.company + ", " + experience.cityState}
                          </h2>

                          <h3 className="md:text-[18px] xs:text-[15px] font-medium">
                            <span>{experience.fromMonth}</span>
                            <span> {experience.fromYear}</span> -
                            <span
                              className={`${
                                experience.isContinue ? "" : "hidden"
                              }`}
                            >
                              &nbsp;Present
                            </span>
                            <span> {experience.toMonth}</span>
                            <span> {experience.toYear}</span>
                          </h3>
                          <p className="md:text-[16px] xs:text-[14px]">
                            {experience.description}
                          </p>
                        </div>
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
          )}
          {/* Experience Cards */}
          {active === "experience-card" && (
            <div className={` w-full flex`}>
              <ul
                id="education-card "
                className="md:my-8 rounded-md shadow-2xl md:p-10 xs:p-4 xs:w-full lg:w-full dark:bg-gray-900 bg-gray-200"
              >
                {userData?.education?.map((education) => {
                  return (
                    <>
                      <li className="mb-4 flex gap-4 ">
                        <div className="relative md:flex md:flex-col items-center mt-[10px] xs:hidden">
                          <div className="absolute w-[2px] dark:bg-[#E0E360] bg-blue-400 h-[115%]"></div>
                          <div className="flex items-center justify-center w-4 h-4 dark:bg-[#E0E360] bg-blue-400 rounded-full">
                            <span className="text-white"></span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <h1 className="md:text-[28px] xs:text-[22px] font-medium">
                            {education.educationLevel +
                              " In " +
                              education.fieldOfStudy}
                          </h1>
                          <h2 className="md:text-[18px] xs:text-[15px] font-medium">
                            {education.schoolName +
                              ", " +
                              education.schoolLocation}{" "}
                          </h2>
                          <h3 className="md:text-[18px] xs:text-[15px] font-medium">
                            <span>{education.fromMonth}</span>
                            <span> {education.fromYear}</span> -
                            <span
                              className={`${
                                education.isContinue ? "" : "hidden"
                              }`}
                            >
                              &nbsp;Present
                            </span>
                            <span> {education.toMonth}</span>
                            <span> {education.toYear}</span>
                          </h3>
                        </div>
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center gap-8 xs:px-2 md:px-0 mt-16 pb-16">
          {loading ? (
            <span className="animate-blink text-[#6a4dff] dark:text-[#e6f85e]">
              Loading ...
            </span>
          ) : (
            <span className=" text-[#6a4dff] dark:text-[#e6f85e]">
              User doesn{"'"}t exist
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
