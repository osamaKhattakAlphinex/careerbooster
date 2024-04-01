"use client";
import Image from "next/image";
import React, { use, useEffect, useRef, useState } from "react";
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
        <div className="absolute px-2 py-1 text-white transform -translate-x-1/2 bg-black rounded bottom-full left-1/2 w-max bg-opacity-80 md:text-base xs:text-xs">
          {text}
        </div>
      )}
    </div>
  );
};

// const DashboardBot: React.FC<DashboardBotProps> = ({ firstName, lastName }) => {
const TourBot = ({ config }: any) => {
  const [toolRefs, setToolRefs] = useState<any>(null);
  const [audios, setAudios] = useState<any>(null);

  const [isGif, setIsGif] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioBuffers, setAudioBuffers] = useState<any>([]);
  const [audioCounter, setAudioCounter] = useState<number>(0);
  const audioPlayerRef: any = useRef(null);

  useEffect(() => {
    if (config) {
      setToolRefs(config.toolRefs);
      setAudios(config.audios);
    }
  }, [config]);

  useEffect(() => {
    console.log(toolRefs, audios);
  }, [audios, toolRefs]);

  const removeStyles = () => {
    toolRefs.map((toolRef: any) => {
      toolRef.ref.current?.classList.remove("un-focused-tool");
    });
  };

  const applyStyles = () => {
    toolRefs.map((toolRef: any) => {
      toolRef.ref.current?.classList.add("un-focused-tool");
    });
  };

  const fetchAudio = async (audioFileUrl: any, explanationFor: string) => {
    try {
      const response = await fetch(audioFileUrl);
      const audioBlob = await response.blob();
      const audioData = await audioBlob.arrayBuffer();
      const arrayBufferView = new Uint8Array(audioData);
      return {
        arrayBufferView,
        explanationFor,
      }; // Return the Blob
    } catch (error) {
      console.error("Error fetching the audio file:", error);
    }
  };

  const focusTool = (audio: any, focusedElement: string) => {
    const audioBlob = new Blob([audio], {
      type: "audio/mpeg",
    });

    if (toolRefs[0].ref.current) {
      applyStyles();

      toolRefs[0].ref.current.classList.remove("un-focused-tool");
    }
    const url = URL.createObjectURL(audioBlob);
    return url;
  };

  const handleClick = async () => {
    try {
      if (isGif) {
        setIsGif(false);
        if (isAudioPlaying) {
          audioPlayerRef.current.pause();
          removeStyles();
          setIsAudioPlaying(false);
        }
        return;
      }

      if (!isAudioPlaying) {
        // If audio is not playing, load and play it
        setIsGif(true);
        setIsAudioPlaying(true);
        setAudioPlayed(true);

        const promises = audios.map((audio: any) =>
          fetchAudio(audio.url, audio.for)
        );

        Promise.all(promises)
          .then((audiosBuffers: any) => {
            setAudioBuffers(audiosBuffers);
          })
          .catch((error) => {
            console.error("Error fetching or decoding audio:", error);
          });
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    if (audioBuffers.length > 0 && audioCounter < audioBuffers.length) {
      const audioUrl = focusTool(
        audioBuffers[audioCounter].arrayBufferView,
        audioBuffers[audioCounter].explanationFor
      );
      audioPlayerRef.current.src = audioUrl;
      audioPlayerRef.current.play();
    }

    if (audioCounter !== 0 && audioCounter === audioBuffers.length) {
      audioPlayerRef.current.pause();
      removeStyles();
      setAudioCounter(0);
      setAudioBuffers([]);
      setIsGif(false);
      setIsAudioPlaying(false);
    }
  }, [audioBuffers, audioCounter]);

  useEffect(() => {
    const audio = audioPlayerRef.current;

    const handleAudioEnded = () => {
      setAudioCounter((prev) => prev + 1);
    };

    audio.addEventListener("ended", handleAudioEnded);

    return () => {
      audio.removeEventListener("ended", handleAudioEnded);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-4 right-4 mr-4 mb-4 cursor-pointer z-10 avatar-animate`}
      onClick={handleClick}
    >
      <Tooltip text="Need Help? Click me" audioPlayed={audioPlayed}>
        <Image
          src={isGif ? "/serviceBot.gif" : "/serviceBot.png"}
          alt="GIF"
          width={200}
          height={200}
          className="botImage xs:hidden md:hidden lg:block"
        />
        <Image
          src={isGif ? "/serviceBot.gif" : "/serviceBot.png"}
          alt="GIF"
          width={100}
          height={100}
          className="botImage xs:block md:block lg:hidden"
        />
      </Tooltip>
      <audio className="hidden" ref={audioPlayerRef} controls />
    </div>
  );
};

export default TourBot;
