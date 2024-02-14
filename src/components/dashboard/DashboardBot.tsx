//v1.1
"use client";
import Image from "next/image";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
        <div className="absolute px-2 py-1 text-white transform -translate-x-1/2 bg-black rounded bottom-full left-1/2 w-max bg-opacity-80">
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
  const [audioBuffers, setAudioBuffers] = useState<any>([]);
  const [audioCounter, setAudioCounter] = useState<number>(0);
  const componentRef: any = useRef(null);
  const audioFileUrl1 = "/speech_dashboard.mp3";
  const audioFileUrl2 = "/speech_resume_card.mp3";
  const audioFileUrl3 = "/speech_cover_letter_card.mp3";
  const audioFileUrl4 = "/speech_linkedin_card.mp3";
  const audioFileUrl5 = "/speech_other_cards.mp3";

  const {
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

  const [isOnScreen, setIsOnScreen] = useState(false);
  const [currentPlayingRef, setCurrentPlayingRef] = useState<any>(null);
  const observerRef = useRef<any>(null);
  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) =>
      setIsOnScreen(entry.isIntersecting)
    );
  }, []);
  useEffect(() => {
    if (currentPlayingRef !== null) {
      observerRef.current.observe(currentPlayingRef.current);
    }

    return () => {
      observerRef.current.disconnect();
    };
  }, [currentPlayingRef]);
  const useOnScreen = (ref: any) => {
    setCurrentPlayingRef(ref);
  };

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

          // const topPos = dashboardRef.current.offsetTop;
          // console.log(topPos);
          // console.log(window.pageYOffset);
          // window.scrollTo({
          //   top: 84,
          //   behavior: "smooth",
          // });
          // console.log(dashboardRef.current.offsetTop);
          // dashboardRef.current.scrollIntoView({
          //   behavior: "smooth",
          // });
          // console.log(window.screenX, dashboardRef.current.offsetTop);
          // console.log(dashboardRef.current);
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
          setAudioCounter(0);
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
      setAudioBuffers([]);
      setIsGif(false);
      setIsAudioPlaying(false);
    }
  }, [audioBuffers, audioCounter]);

  useEffect(() => {
    const audio = componentRef.current;

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
