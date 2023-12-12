"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "@/app/(private_route)/dashboard.css";
interface TooltipProps {
  text: string;
  children: React.ReactNode;
  audioPlayed: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, audioPlayed }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  return (
    <div onClick={toggleTooltip} className="relative inline-block">
      {children}
      {showTooltip && !audioPlayed && (
        <div className="absolute bottom-full left-1/2 transform w-max -translate-x-1/2 bg-black bg-opacity-80 text-white px-2 py-1 rounded">
          {text}
        </div>
      )}
    </div>
  );
};

interface AvatarProps {
  firstName: string;
  lastName: string;
}

const Avatar: React.FC<AvatarProps> = ({ firstName, lastName }) => {
  const [isGif, setIsGif] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [response, setResponse] = useState<any>({});
  const componentRef: any = useRef(null);
  const userData = useSelector((state: any) => state.userData);

  const [prevUserData, setPrevUserData] = useState<{
    firstName: string;
    lastName: string;
  }>({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    axios
      .post("/api/audioGeneration", {
        input: `Hey ${firstName} ${lastName}, I have generated Linkedin Headline and About Sections for you.
        
       Our results maximize your LinkedIn potential with our AI-powered tool! Elevate your profile, stand out to recruiters, and land your dream job faster. `,
      })
      .then((res) => {
        setResponse(res);
      });
  }, [firstName, lastName]);
  const handleClick = async () => {
    try {
      if (
        firstName === prevUserData.firstName &&
        lastName === prevUserData.lastName
      ) {
        setIsGif(!isGif);
        componentRef.current.play();
        return; // If firstName and lastName haven't changed, don't make the request again
      }

      if (response) {
        console.log(response);
        setIsGif(!isGif);
        setAudioPlayed(true);
        const audioData = response.data.data;
        const arrayBufferView = new Uint8Array(audioData);
        const audioBlob = new Blob([arrayBufferView], { type: "audio/mpeg" });
        const url = URL.createObjectURL(audioBlob);

        componentRef.current.src = url;
        componentRef.current.load();
        componentRef.current.play();
        // setPrevUserData({
        //   firstName: userData.firstName,
        //   lastName: userData.lastName,
        // });
        setPrevUserData({
          firstName: firstName,
          lastName: lastName,
        });
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    const audio = componentRef.current;

    const handleAudioEnded = () => {
      setIsGif(false); // Set isGif to false when the audio ends
    };

    audio.addEventListener("ended", handleAudioEnded);

    return () => {
      audio.removeEventListener("ended", handleAudioEnded);
    };
  }, []);

  return (
    <div
      className="fixed bottom-4 right-4 mr-4 mb-4 w-20 h-20 cursor-pointer animate-bounce-slow z-10 avatar-animate"
      onClick={handleClick}
    >
      <Tooltip text="Hey! Click me" audioPlayed={audioPlayed}>
        <Image
          src={isGif ? "/serviceBot.gif" : "/serviceBot.png"}
          alt="GIF"
          width={150}
          height={150}
          className="botImage"
        />
      </Tooltip>
      <audio className="hidden" ref={componentRef} controls />
    </div>
  );
};

export default Avatar;