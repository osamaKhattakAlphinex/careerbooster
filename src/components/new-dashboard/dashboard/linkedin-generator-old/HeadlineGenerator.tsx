"use client";
import Image from "next/image";
import Svg1 from "@/../public/icon/headline-icon.svg";
import buttonIconSrc from "@/../public/icon/u_bolt-alt.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { setField, setIsLoading, setUserData } from "@/store/userDataSlice";
import LimitCard from "../LimitCard";
import axios from "axios";

interface Props {
  setHeadline: React.Dispatch<React.SetStateAction<string>>;
}
const HeadlineGenerator = ({ setHeadline }: Props) => {
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
    setHeadline(streamedData);
  }, [streamedData]);

  useEffect(() => {
    if (userData && userData?.email) {
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
      userData.results.headline &&
      userData.results.headline !== ""
    ) {
      setStreamedData(userData.results.headline);
    }
  }, [userData]);

  const handleGenerate = async () => {
    setStreamedData("");
    await getUserDataIfNotExists();
    //change condition
    if (
      session?.user?.email &&
      !isNaN(availablePercentage) &&
      availablePercentage !== 0
    ) {
      setMsgLoading(true);

      fetch("/api/linkedInBots/headlineGenerator", {
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
              setStreamedData((prev) => prev + text);
              tempText += text;
            }

            await saveToDB(tempText);

            fetch("/api/users/updateUserLimit", {
              method: "POST",
              body: JSON.stringify({
                email: session?.user?.email,
                type: "headline_generation",
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
                    headline_generation:
                      user.userPackageUsed.headline_generation,
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
            headline: tempText,
          },
        },
      });
      const res = await response.json();
      if (res.success) {
        console.log("headline saved to DB");
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
      <div className="headline-generator bg-[#222027] py-8 px-3 lg:px-6 flex flex-col md:flex-row md:align-center gap-5 justify-center items-center rounded-[10px] mb-[20px]">
        <div
          className={`icon  hidden rounded-full  bg-gradient-to-b from-[#5D26C1] to-[#A17FE0] md:flex justify-center items-center md:w-16 md:h-16`}
        >
          <Image
            alt="Svg1"
            src={Svg1}
            width={32}
            height={32}
            className="z-[10000px] "
          />
        </div>
        <div className="linkedintooltext flex  flex-col lg:w-[24.0625rem] gap-2 ml-2">
          <div className="justify-between flex  md:justify-start flex-row">
            <h1 className="text-[16px] text-white font-bold">
              Headline Generator
            </h1>
            <span
              className={`rounded-full flex justify-center items-center px-[16px] py-[6px] md:mx-2  bg-[#02FF19] text-[12px] uppercase font-bold `}
            >
              {/* {iconOfPackageBadge ? (
                <Image
                  src={`${iconOfPackageBadge}`}
                  alt="bold icon"
                  height={18}
                  width={18}
                  className="mr-2"
                />
              ) : null} */}
              free
            </span>
          </div>
          <LimitCard
            title="Available"
            limit={userData?.userPackageData?.limit?.headline_generation}
            used={userData?.userPackageUsed?.headline_generation}
            setPercentageCalculated={setPercentageCalculated}
            availablePercentage={availablePercentage}
            setAvailablePercentage={setAvailablePercentage}
          />
          <p className="text-[14px] text-[#959595] pr-5">
            Generate headlinr for your linkedin in one click
          </p>
        </div>
        <button
          type="button"
          disabled={msgLoading || !session?.user?.email}
          onClick={() => handleGenerate()}
          className={` bg-gradient-to-r  from-[#B324D7] to-[#615DFF] flex flex-row justify-center items-center gap-2 rounded-full px-[32px] py-[12px] lg:ml-auto`}
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
                  className={`text-white ml-3 text-[15px] font-semibold cursor-pointer`}
                >
                  Generate Headline
                </span>
              </div>
            )}
          </span>
        </button>
      </div>

      {streamedData && (
        <div className="rounded border border-gray-500 p-4 mb-4">
          <h1 className="text-4xl font-extrabold text-gray-900  mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              AI Response{" "}
            </span>
          </h1>
          <div
            className="font-sans whitespace-pre-wrap text-gray-300 break-words"
            // style={{ textW: "auto" }}
          >
            {streamedData}
          </div>
        </div>
      )}
    </>
  );
};

export default HeadlineGenerator;
