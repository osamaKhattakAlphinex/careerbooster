"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

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

const Avatar: React.FC = () => {
  const [isGif, setIsGif] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const componentRef: any = useRef(null);
  const userData = useSelector((state: any) => state.userData);
  const [prevUserData, setPrevUserData] = useState<{
    firstName: string;
    lastName: string;
  }>({
    firstName: "",
    lastName: "",
  });
  const handleClick = async () => {
    setIsGif(!isGif);
    try {
      if (
        userData.firstName === prevUserData.firstName &&
        userData.lastName === prevUserData.lastName
      ) {
        componentRef.current.play();
        return; // If firstName and lastName haven't changed, don't make the request again
      }
      const response = await axios.post("/api/audioGeneration", {
        input: `Hey ${userData.firstName} ${userData.lastName}, I am a powerful tool where you can create your resumes, cover letters and more`,
      });

      if (response) {
        setAudioPlayed(true);
        const audioData = response.data.data;
        const arrayBufferView = new Uint8Array(audioData);
        const audioBlob = new Blob([arrayBufferView], { type: "audio/mpeg" });
        const url = URL.createObjectURL(audioBlob);

        componentRef.current.src = url;
        componentRef.current.load();
        componentRef.current.play();
        setPrevUserData({
          firstName: userData.firstName,
          lastName: userData.lastName,
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
      className="absolute bottom-4 right-4 mr-4 mb-4 w-20 h-20 cursor-pointer animate-bounce-slow z-10"
      onClick={handleClick}
    >
      <Tooltip text="Hey! Click me" audioPlayed={audioPlayed}>
        <img
          src={isGif ? "serviceBot.gif" : "serviceBot.png"}
          alt="GIF"
          className="w-full h-full object-cover rounded"
        />
      </Tooltip>
      <audio className="hidden" ref={componentRef} controls />
    </div>
  );
};

export default Avatar;
