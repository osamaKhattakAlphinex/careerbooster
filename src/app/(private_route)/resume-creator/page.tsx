"use client";
import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import ResumeTemplate1 from "@/components/dashboard/resume-templates/template-1";
import { useDispatch, useSelector } from "react-redux";
import {
  WorkExperience,
  setField,
  setIsLoading,
  setUserData,
} from "@/store/userDataSlice";
import {
  setBasicInfo,
  setSummary,
  setWorkExperience,
  setPrimarySkills,
  setSecondarySkills,
  setProfessionalSkills,
  setId,
  setState,
  // setLoadingState,
} from "@/store/resumeSlice";
// import { exitFullScreenIcon, fullScreenIcon } from "@/helpers/iconsProvider";
import axios from "axios";
import { makeid } from "@/helpers/makeid";
import RecentResumeCard from "@/components/dashboard/resume-creator/RecenResumesCard";
import GenerateNewResumeCard from "@/components/dashboard/resume-creator/GenerateNewResumeCard";

const ResumeCreator = () => {
  const componentRef = useRef<any>(null);
  const { data: session } = useSession();

  // streamed data
  const [streamedSummaryData, setStreamedSummaryData] = useState("");
  const [streamedJDData, setStreamedJDData] = useState("");

  // Redux
  const dispatch = useDispatch();
  const resumeData = useSelector((state: any) => state.resume);
  const userData = useSelector((state: any) => state.userData);

  const handleGenerate = async () => {
    await getUserDataIfNotExists();
    if (resumeData.state.jobPosition !== "" && session?.user?.email) {
      // dispatch(setState({ name: "resumeLoading", value: true }));
      // dispatch(setId(""));
      getBasicInfo();
      // getSummary();
      // getWorkExperienceNew();
      // getPrimarySkills();
      // getProfessionalSkills();
      // getSecondarySkills();
    }
  };

  const getBasicInfo = async () => {
    // dispatch(setLoadingState("basicInfo"));

    return fetch("/api/resumeBots/getBasicInfo", {
      method: "POST",
      body: JSON.stringify({
        type: "basicInfo",
        userData,
        jobPosition: resumeData.state.jobPosition,
      }),
    }).then(async (resp: any) => {
      const res = await resp.json();
      if (res.success && res?.data) {
        const myJSON = JSON.parse(res.data);
        const basicObj = {
          ...myJSON,
          name: userData.firstName + " " + userData.lastName,
          contact: {
            ...myJSON.contact,
            email: userData.email,
            phone: userData.phone,
          },
          education: userData.education,
        };
        dispatch(setBasicInfo(basicObj));
      }
    });
  };

  const getSummary = async () => {
    await getUserDataIfNotExists();
    setStreamedSummaryData("");
    dispatch(setSummary(""));
    // dispatch(setLoadingState("summary"));
    return fetch("/api/resumeBots/getBasicInfo", {
      method: "POST",
      body: JSON.stringify({
        type: "summary",
        jobPosition: resumeData.state.jobPosition,
      }),
    }).then(async (resp: any) => {
      if (resp.ok) {
        const reader = resp.body.getReader();
        let summaryTemp = "";
        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          const text = new TextDecoder().decode(value);
          setStreamedSummaryData((prev) => prev + text);
          summaryTemp += text;
        }
        dispatch(setSummary(summaryTemp));
      } else {
        setStreamedSummaryData("Error! Something went wrong");
      }
    });
  };

  const getWorkExperienceNew = async () => {
    // dispatch(setLoadingState("workExperience"));
    await getUserDataIfNotExists();

    if (userData.isFetched) {
      // remove ids from experiences
      const experiences = userData.experience.map((item: WorkExperience) => {
        const { id, ...rest } = item;
        return rest;
      });
      setStreamedJDData("");
      dispatch(setWorkExperience(""));
      let temp = "";
      for (const [index, experience] of experiences.entries()) {
        let html = "";
        html += `<h2 style="font-size: 1.5rem; line-height: 2rem; ">${experience.jobTitle}</h2>`;
        html += `<h2 style="font-size: 1.1rem; line-height: 1.75rem; margin-bottom: 0.5rem">
        ${experience.fromMonth} ${experience.fromYear} - ${
          experience.isContinue
            ? "Present"
            : experience.toMonth + " " + experience.toYear
        } | ${experience.company} | 
        ${experience?.cityState} ${experience?.country}
                  </h2>`;
        html += `<p>`;

        temp += html;
        setStreamedJDData((prev) => prev + html);
        const res: any = await fetch("/api/resumeBots/jdGeneratorSingle", {
          method: "POST",
          body: JSON.stringify({
            experience: experience,
          }),
        });

        if (res.ok) {
          const reader = res.body.getReader();
          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              break;
            }

            const text = new TextDecoder().decode(value);
            setStreamedJDData((prev) => prev + text);
            temp += text;
          }
        }

        setStreamedJDData((prev) => prev + `</p> <br /> `);
        temp += `</p> <br /> `;
      }
      dispatch(setWorkExperience(temp));
      dispatch(setState({ name: "resumeLoading", value: false }));
    }
  };

  // const getWorkExperience = async () => {
  //   await getUserDataIfNotExists();
  //   // dispatch(setLoadingState("workExperience"));
  //   return fetch("/api/resumeBots/getBasicInfo", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       type: "workExperience",
  //       jobPosition: resumeData.state.jobPosition,
  //     }),
  //   }).then(async (resp: any) => {
  //     const res = await resp.json();
  //     if (res.success) {
  //       console.clear();
  //       if (res?.data?.text) {
  //         const tSon = JSON.stringify(res?.data?.text);
  //         const myJSON = JSON.parse(tSon);
  //         console.log("myJSON1: ", myJSON);
  //         dispatch(setWorkExperience(myJSON));
  //       } else if (res?.data) {
  //         const myJSON = JSON.parse(res.data);
  //         console.log("myJSON2: ", myJSON);
  //         dispatch(setWorkExperience(myJSON));
  //       }
  //     }
  //   });
  // };

  const getPrimarySkills = async () => {
    // dispatch(setLoadingState("primarySkills"));
    await getUserDataIfNotExists();
    return fetch("/api/resumeBots/getBasicInfo", {
      method: "POST",
      body: JSON.stringify({
        type: "primarySkills",
        jobPosition: resumeData.state.jobPosition,
      }),
    }).then(async (resp: any) => {
      const res = await resp.json();
      if (res.success) {
        if (res?.data?.text) {
          const tSon = JSON.stringify(res?.data?.text);
          const myJSON = JSON.parse(tSon);
          dispatch(setPrimarySkills(myJSON));
        } else if (res?.data) {
          const myJSON = JSON.parse(res.data);
          dispatch(setPrimarySkills(myJSON));
        }
      }
    });
  };

  const getProfessionalSkills = async () => {
    // dispatch(setLoadingState("professionalSkills"));
    return fetch("/api/resumeBots/getBasicInfo", {
      method: "POST",
      body: JSON.stringify({
        type: "professionalSkills",
        email: session?.user?.email,
        jobPosition: resumeData.state.jobPosition,
      }),
    }).then(async (resp: any) => {
      const res = await resp.json();
      if (res.success) {
        if (res?.data?.text) {
          const tSon = JSON.stringify(res?.data?.text);
          const myJSON = JSON.parse(tSon);
          dispatch(setProfessionalSkills(myJSON));
        } else if (res?.data) {
          const myJSON = JSON.parse(res.data);
          dispatch(setProfessionalSkills(myJSON));
        }
      }
    });
  };

  const getSecondarySkills = async () => {
    // dispatch(setLoadingState("secondarySkills"));
    return fetch("/api/resumeBots/getBasicInfo", {
      method: "POST",
      body: JSON.stringify({
        type: "secondarySkills",
        email: session?.user?.email,
        jobPosition: resumeData.state.jobPosition,
      }),
    }).then(async (resp: any) => {
      const res = await resp.json();
      if (res.success) {
        if (res?.data?.text) {
          const tSon = JSON.stringify(res?.data?.text);
          const myJSON = JSON.parse(tSon);
          dispatch(setSecondarySkills(myJSON));
        } else if (res?.data) {
          const myJSON = JSON.parse(res.data);
          dispatch(setSecondarySkills(myJSON));
        }
      }
    });
  };

  const getUserDataIfNotExists = async () => {
    if (!userData.isLoading && !userData.isFetched) {
      dispatch(setIsLoading(true));
      // Fetch userdata if not exists in Redux
      const res = await fetch(
        `/api/users/getOneByEmail?email=${session?.user?.email}`
      );

      const { user } = await res.json();
      dispatch(setUserData(user));
      dispatch(setIsLoading(false));
      dispatch(setField({ name: "isFetched", value: true }));
    }
  };

  // when page (session) loads, fetch user data if not exists
  useEffect(() => {
    if (session?.user?.email) {
      getUserDataIfNotExists();
    }
  }, [session?.user?.email]);

  useEffect(() => {
    if (!resumeData.state.resumeLoading && resumeData?.name) {
      saveResumeToDB();
    }
  }, [resumeData.state.resumeLoading]);

  const saveResumeToDB = async () => {
    let obj = resumeData;
    if (!resumeData.id || resumeData.id === "") {
      obj = { ...resumeData, id: makeid(), dateTime: new Date() };
    }

    axios
      .post("/api/resumeBots/saveResumeToDB", {
        email: session?.user?.email,
        resumeData: obj,
      })
      .then(async (resp) => {
        dispatch(setId(obj.id));
        // update user
        const res = await fetch(
          `/api/users/getOneByEmail?email=${session?.user?.email}`
        );

        const { user } = await res.json();
        dispatch(setUserData(user));
      });
  };

  return (
    <>
      <RecentResumeCard />
      <GenerateNewResumeCard
        handleGenerate={handleGenerate}
        saveResumeToDB={saveResumeToDB}
      />

      {resumeData &&
        (resumeData?.name ||
          resumeData?.contact?.email ||
          resumeData?.summary) && (
          <div className="m-10  w-[95%]  bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
            <div className="w-full card" ref={componentRef}>
              <ResumeTemplate1
                streamedSummaryData={streamedSummaryData}
                streamedJDData={streamedJDData}
              />
            </div>
          </div>
        )}
    </>
  );
};
export default ResumeCreator;
