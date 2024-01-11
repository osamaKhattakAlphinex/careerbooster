import React from "react";
import useGetUserData from "./useGetUserData";
import { useDispatch, useSelector } from "react-redux";
import { setState, setWorkExperience, setWorkExperienceArray } from "@/store/resumeSlice";
import { WorkExperience } from "@/store/userDataSlice";
import { fetchLIstOfStrings } from "@/helpers/fetchLIstOfStrings";

const useSingleJDGenerate = (setStreamedJDData: any) => {
    const { getUserDataIfNotExists } = useGetUserData()
    const dispatch = useDispatch();
    const userData = useSelector((state: any) => state.userData);
    const resumeData = useSelector((state: any) => state.resume);
    const getOneWorkExperienceNew = async (quantifyingExperience: boolean) => {
        // return makeAPICallWithRetry(async () => {
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
            const workExpArr: any = [];
            for (const [index, experience] of experiences.entries()) {
                let workExpArrObj: any = {};
                let html = "";
                html += `<h2 style="font-size: 1.3rem; font-weight: bold; line-height: 2rem; ">${experience?.jobTitle}</h2>`;
                workExpArrObj.title = experience?.jobTitle;

                html += `<h2 style="font-size: 1.1rem; line-height: 1.5rem">
            
            ${experience?.fromMonth} ${experience?.fromYear} - ${experience?.isContinue
                        ? "Present"
                        : experience?.toMonth + " " + experience?.toYear
                    } | ${experience?.company} | 
            ${experience?.cityState} ${experience?.country}
                      </h2>`;
                html += `<div>`;
                workExpArrObj.cityState = experience?.cityState;
                workExpArrObj.country = experience?.country;
                workExpArrObj.company = experience?.company;
                workExpArrObj.fromMonth = experience?.fromMonth;
                workExpArrObj.fromYear = experience?.fromYear;
                workExpArrObj.isContinue = experience?.isContinue;
                workExpArrObj.toMonth = experience?.toMonth;
                workExpArrObj.toYear = experience?.toYear;

                temp += html;
                let achievementTemp = "";
                setStreamedJDData((prev: any) => prev + html);
                const res: any = await fetch("/api/resumeBots/jdGeneratorSingle", {
                    method: "POST",
                    body: JSON.stringify({
                        quantifyingExperience: quantifyingExperience,
                        experience: experience,
                        trainBotData: {
                            userEmail: userData.email,
                            // fileAddress: userData.files[0].fileName,
                            fileAddress: userData.uploadedResume.fileName,
                        },
                        personName: userData.firstName + " " + userData.lastName,
                        jobTitle: resumeData.state.jobPosition,
                    }),
                });
                // const response = await res.json();
                // console.log("result", result, typeof result);
                if (res.ok) {
                    const reader = res.body.getReader();
                    while (true) {
                        const { done, value } = await reader.read();

                        if (done) {
                            break;
                        }

                        const text = new TextDecoder().decode(value);
                        // const text = response.result;
                        setStreamedJDData((prev: any) => prev + text);
                        temp += text;
                        achievementTemp += text;
                    }
                }

                setStreamedJDData((prev: any) => prev + `</div> <br /> `);
                temp += `</div> <br /> `;
                const achivementsArray = fetchLIstOfStrings(achievementTemp);
                workExpArrObj.achievements = achivementsArray;
                workExpArr.push(workExpArrObj);
            }
            dispatch(setWorkExperienceArray({ workExperienceArray: workExpArr }));
            dispatch(setState({ name: "resumeLoading", value: false }));
            dispatch(setWorkExperience(temp));
        }
        // });
    };
    return { getOneWorkExperienceNew };
};

export default useSingleJDGenerate;
