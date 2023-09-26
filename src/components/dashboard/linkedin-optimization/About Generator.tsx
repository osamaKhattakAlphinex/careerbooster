"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { setField, setIsLoading, setUserData } from "@/store/userDataSlice";
import Button from "@/components/utilities/form-elements/Button";
import LimitCard from "../LimitCard";

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
        education: userData?.contact,
        email: userData?.contact,
        experience: userData?.contact,
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        phone: userData?.phone,
        skills: userData?.skills,
      });
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
        body: JSON.stringify({ userData: aiInputUserData }),
      })
        .then(async (resp: any) => {
          if (resp.ok) {
            const reader = resp.body.getReader();
            while (true) {
              const { done, value } = await reader.read();

              if (done) {
                break;
              }

              const text = new TextDecoder().decode(value);
              setStreamedData((prev) => prev + text);
            }
            fetch("/api/users/updateUserLimit", {
              method: "POST",
              body: JSON.stringify({
                email: session?.user?.email,
                type: "about_generation",
              }),
            }).then(async (resp: any) => {
              const res = await resp.json();
              if (res.success) {
                const updatedObject = {
                  ...userData,
                  userPackageUsed: {
                    ...userData.userPackageUsed,
                    about_generation: res.user.userPackageUsed.about_generation,
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

  const getUserDataIfNotExists = async () => {
    if (!userData.isLoading && !userData.isFetched) {
      dispatch(setIsLoading(true));
      try {
        // Fetch userdata if not exists in Redux
        const res = await fetch(
          `/api/users/getOneByEmail?email=${session?.user?.email}`
        );
        const { user } = await res.json();
        dispatch(setUserData(user));
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
    <div className="w-full ">
      <div className="space-y-4 md:space-y-6">
        <div className="w-[95%] flex items-center justify-between">
          <h2 className="text-2xl">About Generator</h2>
          <LimitCard
            title="Available"
            limit={userData?.userPackage?.limit?.about_generation}
            used={userData?.userPackageUsed?.about_generation}
            setPercentageCalculated={setPercentageCalculated}
            availablePercentage={availablePercentage}
            setAvailablePercentage={setAvailablePercentage}
          />
        </div>
        <div className="flex flex-row gap-4">
          {!isNaN(availablePercentage) && availablePercentage !== 0 && (
            <div>
              <Button
                type="button"
                disabled={msgLoading || !session?.user?.email}
                onClick={() => handleGenerate()}
                className="btn btn-outline-primary-dark"
              >
                <div className="flex flex-row gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className={`w-4 h-4 ${msgLoading ? "animate-spin" : ""}`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                  <span>
                    {msgLoading ? "Please wait..." : "Generate About"}
                  </span>
                </div>
              </Button>
            </div>
          )}
        </div>
        {streamedData && (
          <div className="m-4  rounded border p-4">
            <h1 className="text-4xl font-extrabold text-gray-900  mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                AI Response{" "}
              </span>
            </h1>
            <div
              className="font-sans whitespace-pre-wrap break-words"
              // style={{ textW: "auto" }}
            >
              {streamedData}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default AboutGenerator;
