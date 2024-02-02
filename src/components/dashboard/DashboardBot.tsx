"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import "@/app/(private_route)/dashboard.css";
import { useTourContext } from "@/context/TourContext";
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

// const DashboardBot: React.FC<DashboardBotProps> = ({ firstName, lastName }) => {
const DashboardBot = () => {
  const [isGif, setIsGif] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const componentRef: any = useRef(null);
  const audioFileUrl1 = "/speech_dashboard.mp3";
  const audioFileUrl2 = "/speech_resume_card.mp3";
  const audioFileUrl3 = "/speech_cover_letter_card.mp3";
  const audioFileUrl4 = "/speech_linkedin_card.mp3";
  const audioFileUrl5 = "/speech_other_cards.mp3";

  const {
    resumeElementRef,
    coverLetterElementRef,
    linkedinElementRef,
    emailElementRef,
    bidElementRef,
    coachElementRef,
    reviewElementRef,
    finderElementRef,
    atsElementRef,
  } = useTourContext();

  const concatenateBuffers = (buffers: any) => {
    const totalLength = buffers.reduce(
      (acc: any, buffer: any) => acc + buffer.length,
      0
    );
    const concatenated = new Uint8Array(totalLength);
    let offset = 0;
    buffers.forEach((buffer: any) => {
      concatenated.set(buffer, offset);
      offset += buffer.length;
    });
    return concatenated;
  };
  const fetchAudio = async (audioFileUrl: any) => {
    try {
      const response = await fetch(audioFileUrl);
      const audioBlob = await response.blob();
      const audioData = await audioBlob.arrayBuffer();
      const arrayBufferView = new Uint8Array(audioData);
      return arrayBufferView; // Return the Blob
    } catch (error) {
      console.error("Error fetching the audio file:", error);
    }
  };

  const handleClick = async () => {
    try {
      console.log(isAudioPlaying);
      if (isGif) {
        setIsGif(!isGif);
        if (isAudioPlaying) {
          componentRef.current.pause();
          // componentRef.current.stop();
          setIsAudioPlaying(false);
        }
        return;
      }
      if (componentRef.current.src !== "") {
        setIsGif(!isGif);
        setIsAudioPlaying(true);
        componentRef.current.play();
        return; // If firstName and lastName haven't changed, don't make the request again
      }

      if (!isAudioPlaying && componentRef.current.src === "") {
        // If audio is not playing, load and play it
        setIsGif(!isGif);
        setAudioPlayed(true);

        Promise.all([
          fetchAudio(audioFileUrl1),
          fetchAudio(audioFileUrl2),
          fetchAudio(audioFileUrl3),
          fetchAudio(audioFileUrl4),
          fetchAudio(audioFileUrl5),
        ])
          .then((audioBuffers) => {
            const concatenatedBuffer = concatenateBuffers(audioBuffers);
            const audioBlob = new Blob([concatenatedBuffer], {
              type: "audio/mpeg",
            });
            const url = URL.createObjectURL(audioBlob);
            componentRef.current.src = url;
          })
          .catch((error) => {
            console.error("Error fetching or decoding audio:", error);
          });

        componentRef.current.play();
        setIsAudioPlaying(true);
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
      className={`fixed bottom-4 right-4 mr-4 mb-4 w-20 h-20 cursor-pointer z-10 avatar-animate`}
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

export default DashboardBot;
