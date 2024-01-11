"use client"
import React, { useEffect, useState } from "react";
import useGetUserData from "./useGetUserData";
import { useDispatch, useSelector } from "react-redux";
import { setState, setWorkExperience, setWorkExperienceArray } from "@/store/resumeSlice";
import { WorkExperience } from "@/store/userDataSlice";
import { fetchLIstOfStrings } from "@/helpers/fetchLIstOfStrings";
import useSaveResumeToDB from "./useSaveToDB";

const useSingleJDGenerate = (setStreamedJDData: any) => {
    const { getUserDataIfNotExists } = useGetUserData()
    const dispatch = useDispatch();
    const userData = useSelector((state: any) => state.userData);
    const [regeneration, setRegeneration] = useState<boolean>(false);
    const resumeData = useSelector((state: any) => state.resume);
    let oneWorkExpIndex: number
    const { saveResumeToDB } = useSaveResumeToDB()

    const getOneWorkExperienceNew = async (experience: any) => {
        setStreamedJDData("");
        dispatch(setWorkExperience(""));
        let temp = "";
        console.log(resumeData);
        console.log(experience);
        let workExpArray = [...resumeData.workExperienceArray];
        console.log(workExpArray, typeof workExpArray);
        if (experience && workExpArray.length) {
            console.log("first");
            oneWorkExpIndex = workExpArray.findIndex((workExp: any) => JSON.stringify(workExp) === JSON.stringify(experience));
            console.log(oneWorkExpIndex);


        }

        await getUserDataIfNotExists();
        const { quantifyingExperience } = resumeData
        if (userData.isFetched) {

            let workExpArrObj: any = {};
            // let html = "";
            // html += `<h2 style="font-size: 1.3rem; font-weight: bold; line-height: 2rem; ">${experience?.jobTitle}</h2>`;
            workExpArrObj.title = experience?.title;

            // html += `<h2 style="font-size: 1.1rem; line-height: 1.5rem">

            // ${experience?.fromMonth} ${experience?.fromYear} - ${experience?.isContinue
            //         ? "Present"
            //         : experience?.toMonth + " " + experience?.toYear
            //     } | ${experience?.company} | 
            // ${experience?.cityState} ${experience?.country}
            //           </h2>`;
            // html += `<div>`;
            workExpArrObj.cityState = experience?.cityState;
            workExpArrObj.country = experience?.country;
            workExpArrObj.company = experience?.company;
            workExpArrObj.fromMonth = experience?.fromMonth;
            workExpArrObj.fromYear = experience?.fromYear;
            workExpArrObj.isContinue = experience?.isContinue;
            workExpArrObj.toMonth = experience?.toMonth;
            workExpArrObj.toYear = experience?.toYear;

            // temp += html;
            let achievementTemp = "";
            // setStreamedJDData((prev: any) => prev + html);
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
                    // temp += text;
                    achievementTemp += text;
                }
            }

            setStreamedJDData((prev: any) => prev + `</div> <br /> `);
            temp += `</div> <br /> `;
            const achivementsArray = fetchLIstOfStrings(achievementTemp);
            workExpArrObj.achievements = achivementsArray;

            workExpArray.splice(oneWorkExpIndex, 1, workExpArrObj);
        }
        saveResumeToDB({
            ...resumeData,
            workExperienceArray: workExpArray,
        });
        dispatch(setWorkExperienceArray({ workExperienceArray: workExpArray }));
        dispatch(setState({ name: "resumeLoading", value: false }));
        // dispatch(setWorkExperience(temp));
        setStreamedJDData("");


    }


    return { getOneWorkExperienceNew };
};

export default useSingleJDGenerate;
