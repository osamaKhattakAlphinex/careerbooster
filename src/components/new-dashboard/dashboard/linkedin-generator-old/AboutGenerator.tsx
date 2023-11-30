"use client";
import Image from "next/image";
import Svg1 from "@/../public/icon/headline-icon.svg";
import buttonIconSrc from "@/../public/icon/u_bolt-alt.svg";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { setField, setIsLoading, setUserData } from "@/store/userDataSlice";
import Button from "@/components/utilities/form-elements/Button";
import LimitCard from "../LimitCard";
import axios from "axios";
interface Props {
  setAbout: React.Dispatch<React.SetStateAction<string>>;
}
const AboutGenerator = ({ setAbout }: Props) => {
  const [msgLoading, setMsgLoading] = useState<boolean>(false); // msg loading
  const { data: session, status } = useSession();
  const [streamedData, setStreamedData] = useState("");
  const [aiInputUserData, setAiInputUserData] = useState<any>();
  const [availablePercentage, setAvailablePercentage] = useState<number>(0);
  const [percentageCalculated, setPercentageCalculated] =
    useState<boolean>(false);

  // Redux
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userData);

  useEffect(() => {
    if (
      userData &&
      userData?.email &&
      !isNaN(availablePercentage) &&
      availablePercentage !== 0
    ) {
      setAiInputUserData({
        contact: userData?.contact,
        education: userData?.education,
        email: userData?.email,
        experience: userData?.experience,
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        phone: userData?.phone,
        skills: userData?.skills,
      });
    }
    if (
      userData.results &&
      userData.results.about &&
      userData.results.about !== ""
    ) {
      setStreamedData(userData.results.about);
    }
  }, [userData]);

  useEffect(() => {
    setAbout(streamedData);
  }, [streamedData]);

  const handleGenerate = async () => {
    setStreamedData("");
    await getUserDataIfNotExists();
    if (session?.user?.email) {
      setMsgLoading(true);
      fetch("/api/linkedInBots/aboutGenerator", {
        method: "POST",
        body: JSON.stringify({
          userData: aiInputUserData,
          trainBotData: {
            userEmail: userData.email,
            fileAddress: userData.defaultResumeFile,
          },
        }),
      })
        .then(async (resp: any) => {
          if (resp.ok) {
            const reader = resp.body.getReader();
            let tempText = "";
            while (true) {
              const { done, value } = await reader.read();

              if (done) {
                break;
              }

              const text = new TextDecoder().decode(value);
              tempText += text;
              setStreamedData((prev) => prev + text);
            }
            await saveToDB(tempText);
            fetch("/api/users/updateUserLimit", {
              method: "POST",
              body: JSON.stringify({
                email: session?.user?.email,
                type: "about_generation",
              }),
            }).then(async (resp: any) => {
              const res = await resp.json();
              let user;
              if (typeof res?.result === "object") {
                user = res.result;
              } else {
                user = await JSON.parse(res.result);
              }
              if (res.success) {
                const updatedObject = {
                  ...userData,
                  userPackageUsed: {
                    ...userData.userPackageUsed,
                    about_generation: user.userPackageUsed.about_generation,
                  },
                };
                dispatch(setUserData({ ...userData, ...updatedObject }));
              }
            });
          } else {
            setStreamedData("Error! Something went wrong");
          }
          setMsgLoading(false);
        })
        .catch((error) => {
          console.log("Error encountered");
        })
        .finally(() => {
          setMsgLoading(false);
        });
    }
  };

  const saveToDB = async (tempText: string) => {
    try {
      const response: any = await axios.post("/api/users/updateUserData", {
        data: {
          email: session?.user?.email,
          results: {
            ...userData.results,
            about: tempText,
          },
        },
      });
      const res = await response.json();
      if (res.success) {
        console.log("about saved to DB");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserDataIfNotExists = async () => {
    if (!userData.isLoading && !userData.isFetched) {
      dispatch(setIsLoading(true));
      try {
        // Fetch userdata if not exists in Redux
        const res = await fetch(
          `/api/users/getOneByEmail?email=${session?.user?.email}`
        );
        const response = await res.json();
        console.log(
          "first response: " + response.result,
          typeof response.result
        );

        dispatch(setUserData(response.result));
        dispatch(setIsLoading(false));
        dispatch(setField({ name: "isFetched", value: true }));
      } catch (err) {
        setStreamedData("Something went wrong!");
      }
    }
  };

  // when page (session) loads, fetch user data if not exists
  useEffect(() => {
    if (session?.user?.email) {
      getUserDataIfNotExists();
    }
  }, [session?.user?.email]);
  return (
    <>
      <div className="headline-generator bg-[#222027] py-8 px-6 flex align-center gap-5 justify-center items-center rounded-[10px] mb-[20px]">
        <div
          className={`icon rounded-full bg-gradient-to-b from-[#26A5C1] to-[#84E1E7] flex justify-center items-center w-16 h-16`}
        >
          <Image
            alt="Svg1"
            src={Svg1}
            width={32}
            height={32}
            className="z-[10000px]"
          />
        </div>
        <div className="linkedintooltext flex flex-col w-[24.0625rem] gap-2 ml-2">
          <div className="flex flex-row gap-3">
            <h1 className="text-[16px] text-white font-bold">
              About Generator
            </h1>
            <span
              className={`rounded-full flex justify-center items-center px-[16px] py-[6px]  bg-[#02FF19] text-[12px] uppercase font-bold `}
            >
              free
            </span>
          </div>
          <p className="text-[14px] text-[#959595] pr-5">
            The purpose of lorem ipsum is to create a natural looking block of
            text (sentence{","} paragraph{","} page{","} etc{"."})
          </p>
        </div>
        <button
          type="button"
          disabled={msgLoading || !session?.user?.email}
          onClick={() => handleGenerate()}
          className={` bg-gradient-to-r from-[#B324D7] to-[#615DFF] flex flex-row justify-center items-center gap-2 rounded-full px-[32px] py-[12px] ml-auto`}
        >
          <span className={`text-white text-[15px] font-semibold`}>
          {msgLoading ? (
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={`w-4 h-4 mr-3 ${msgLoading ? "animate-spin" : ""}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
                Please wait...
              </div>
            ) : (
              <div className="flex">
                <Image
                  src={buttonIconSrc}
                  alt="bold icon"
                  height={18}
                  width={18}
                />
                <span
                  className={`text-white ml-3 text-[15px] font-semibold`}
                >
                  Generate About
                </span>
              </div>
            )}
          </span>
        </button>
      </div>
      {streamedData && (
          <div className="rounded border border-gray-500 mb-4 p-4">
            <h1 className="text-4xl font-extrabold text-gray-900  mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                AI Response{" "}
              </span>
            </h1>
            <div
              className="font-sans text-gray-300 whitespace-pre-wrap break-words"
              // style={{ textW: "auto" }}
            >
              {streamedData}
            </div>
          </div>
        )}
    </>
  );
};

export default AboutGenerator;
