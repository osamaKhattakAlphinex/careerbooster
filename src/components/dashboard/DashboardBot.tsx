"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import "@/app/(private_route)/dashboard.css";
import { useTourContext } from "@/context/TourContext";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import { useSelector } from "react-redux";
interface TooltipProps {
  text: string;
  children: React.ReactNode;
  audioPlayed: boolean;
  isAudioPlaying: boolean;
  subtitleText: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  audioPlayed,
  isAudioPlaying,
  subtitleText,
}) => {
  const [showTooltip, setShowTooltip] = useState(true);
  const [chunkIndex, setChunkIndex] = useState<number>(0);
  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };
  useEffect(() => {
    // Reset chunk index when audio is not playing
    if (!isAudioPlaying) {
      setChunkIndex(0);
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    // Change chunk of subtitle text after a short duration
    if (isAudioPlaying) {
      const timer = setTimeout(() => {
        setChunkIndex((prevIndex) => prevIndex + 1);
      }, 1200); // Change chunk every 1 second (adjust as needed)

      return () => clearTimeout(timer);
    }
  }, [isAudioPlaying, chunkIndex]);

  // Function to split subtitle text into chunks
  const getSubtitleChunk = () => {
    const words = subtitleText?.split(" ");
    if (words?.length) {
      const chunkSize = 4; // Adjust this to change the chunk size
      const startIndex = chunkIndex * chunkSize;
      const endIndex = Math.min(startIndex + chunkSize, words.length);
      return words.slice(startIndex, endIndex).join(" ");
    }
  };

  return (
    <div onClick={toggleTooltip} className="relative inline-block">
      {children}
      {showTooltip && !audioPlayed ? (
        <div className="absolute px-2 py-1 text-white transform -translate-x-1/2 bg-black rounded bottom-full left-1/2 w-max bg-opacity-80 md:text-base xs:text-xs">
          {text}
        </div>
      ) : (
        <>
          {isAudioPlaying && (
            <div className="absolute px-2 py-1 text-white transform -translate-x-1/2 bg-black rounded bottom-full left-1/2 w-max bg-opacity-80 md:text-base xs:text-xs">
              {getSubtitleChunk()}
            </div>
          )}
        </>
      )}
    </div>
  );
};

// const DashboardBot: React.FC<DashboardBotProps> = ({ firstName, lastName }) => {
const DashboardBot = () => {
  const userData = useSelector((state: any) => state.userData);
  const [isGif, setIsGif] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioBuffers, setAudioBuffers] = useState<any>([]);
  const [audioCounter, setAudioCounter] = useState<number>(0);
  const [subTitleCounter, setSubtitleCounter] = useState<number>(0);
  const componentRef: any = useRef(null);
  const audioFileUrl1 = "/speech_dashboard.mp3";
  const audioFileUrl2 = "/speech_resume_card.mp3";
  const audioFileUrl3 = "/speech_cover_letter_card.mp3";
  const audioFileUrl4 = "/speech_linkedin_card.mp3";
  const audioFileUrl5 = "/speech_other_cards.mp3";
  const subtitles = [
    "Hey! This page is our main dashboard where you can access all the features we provide",
    "This card will lead you to resume section where you can create AI powered resumes for your targeted job position",
    "Next, we have cover letters section where you can create professional cover letters for any job position",
    "And this one is our linkedin optimization tool which helps in boosting your linkedin profile to increase visibility for recruiters",
    "Other than these we have email generation, bid generation and other features which you can explore in our dashboard",
  ];
  const { updateSaveHook } = useUpdateAndSave();
  const { updateAndSaveTourStatus } = updateSaveHook;

  const {
    tourBotRef,
    dashboardRef,
    innerToolsRef,
    resumeElementRef,
    coverLetterElementRef,
    linkedinElementRef,
    emailElementRef,
    bidElementRef,
    coachElementRef,
    reviewElementRef,
    finderElementRef,
    atsElementRef,
    contentScrollRef,
  } = useTourContext();
  const componentRefs = [
    resumeElementRef,
    coverLetterElementRef,
    linkedinElementRef,
    emailElementRef,
    bidElementRef,
    coachElementRef,
    reviewElementRef,
    finderElementRef,
    atsElementRef,
  ];

  const removeStyles = () => {
    componentRefs.map((componentRef) => {
      componentRef.current?.classList.remove("un-focused-tool");
    });
    if (dashboardRef.current && innerToolsRef.current) {
      dashboardRef.current.classList.remove("dashboard-focused");
      innerToolsRef.current.classList.remove("dark:bg-[#11121c]");
      innerToolsRef.current.classList.remove("bg-[#F3F4F6]");
    }
  };

  const applyStyles = () => {
    componentRefs.map((componentRef) => {
      componentRef.current?.classList.add("un-focused-tool");
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
    // let offset = -140;
    switch (focusedElement) {
      case "dashboard":
        if (dashboardRef.current && innerToolsRef.current) {
          dashboardRef.current.classList.add("dashboard-focused");
          innerToolsRef.current.classList.add("dark:bg-[#11121c]");
          innerToolsRef.current.classList.add("bg-[#F3F4F6]");
        }
        break;
      case "resume":
        applyStyles();
        if (resumeElementRef.current) {
          resumeElementRef.current.classList.remove("un-focused-tool");

          // resumeElementRef.current.scrollIntoView({
          //   behavior: "smooth",
          // });
        }
        break;
      case "cover-letter":
        applyStyles();
        if (coverLetterElementRef.current) {
          coverLetterElementRef.current.classList.remove("un-focused-tool");
          // coverLetterElementRef.current.scrollIntoView({
          //   behavior: "smooth",
          // });
        }
        break;
      case "linkedin":
        applyStyles();
        if (linkedinElementRef.current) {
          linkedinElementRef.current.classList.remove("un-focused-tool");
        }
        break;
      case "overall":
        applyStyles();
        if (
          emailElementRef.current &&
          bidElementRef.current &&
          coachElementRef.current &&
          reviewElementRef.current &&
          finderElementRef.current &&
          atsElementRef.current
        ) {
          emailElementRef.current.classList.remove("un-focused-tool");
          bidElementRef.current.classList.remove("un-focused-tool");
          coachElementRef.current.classList.remove("un-focused-tool");
          reviewElementRef.current.classList.remove("un-focused-tool");
          finderElementRef.current.classList.remove("un-focused-tool");
          atsElementRef.current.classList.remove("un-focused-tool");
        }
        break;
      default:
        return null;
    }
    const url = URL.createObjectURL(audioBlob);
    return url;
  };

  const handleClick = async () => {
    try {
      if (isGif) {
        setIsGif(false);
        if (isAudioPlaying) {
          componentRef.current.pause();
          removeStyles();
          setIsAudioPlaying(false);
        }
        return;
      }
      // if (componentRef.current.src !== "") {
      //   setIsGif(!isGif);
      //   setIsAudioPlaying(true);
      //   componentRef.current.play();
      //   return;
      // }
      // console.log(componentRef.current.src);

      if (!isAudioPlaying) {
        // If audio is not playing, load and play it
        setIsGif(true);
        setIsAudioPlaying(true);
        setAudioPlayed(true);
        Promise.all([
          fetchAudio(audioFileUrl1, "dashboard"),
          fetchAudio(audioFileUrl2, "resume"),
          fetchAudio(audioFileUrl3, "cover-letter"),
          fetchAudio(audioFileUrl4, "linkedin"),
          fetchAudio(audioFileUrl5, "overall"),
        ])
          .then((audios: any) => {
            setAudioBuffers(audios);
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
    if(audioCounter === 1 && !userData.tours?.dashboard ){
      updateAndSaveTourStatus({ dashboard: true });
    }
    if (audioBuffers.length > 0 && audioCounter < audioBuffers.length) {
      const audioUrl = focusTool(
        audioBuffers[audioCounter].arrayBufferView,
        audioBuffers[audioCounter].explanationFor
      );
      componentRef.current.src = audioUrl;
      componentRef.current.play();
    }

    if (audioCounter !== 0 && audioCounter === audioBuffers.length) {
      componentRef.current.pause();
      removeStyles();
      setAudioCounter(0);
      setSubtitleCounter(0);
      setAudioBuffers([]);
      setIsGif(false);
      setIsAudioPlaying(false);
    }
  }, [audioBuffers, audioCounter]);

  useEffect(() => {
    const audio = componentRef.current;

    const handleAudioEnded = () => {
      setAudioCounter((prev) => prev + 1);
      setSubtitleCounter((prev) => prev + 1);
    };

    audio.addEventListener("ended", handleAudioEnded);

    return () => {
      audio.removeEventListener("ended", handleAudioEnded);
    };
  }, []);

  return (
    <div
      ref={(ref: any) => (tourBotRef.current = ref)}
      className={`fixed bottom-4 right-4 mr-4 mb-4 cursor-pointer z-10 avatar-animate`}
      onClick={handleClick}
    >
      <Tooltip
        text="Need Help? Click me"
        audioPlayed={audioPlayed}
        isAudioPlaying={isAudioPlaying}
        subtitleText={subtitles[subTitleCounter]}
      >
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
      <audio className="hidden" ref={componentRef} controls />
    </div>
  );
};

export default DashboardBot;
