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

interface VirtualBotProps {
  firstName: string;
  lastName: string;
}

const VirtualBot: React.FC<VirtualBotProps> = ({ firstName, lastName }) => {
  const [isGif, setIsGif] = useState(false);
  const [audioPrepared, setAudioPrepared] = useState(false);
  const [response, setResponse] = useState<ArrayBufferLike>();
  const componentRef = useRef<HTMLAudioElement | null>(null);
  const audioFileUrl1 = "/speech1.mp3";
  const audioFileUrl2 = "/speech_scan_resume.mp3";

  const [prevUserData, setPrevUserData] = useState<{
    firstName: string;
    lastName: string;
  }>({
    firstName: "",
    lastName: "",
  });

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

  useEffect(() => {
    axios
      .post("/api/audioGeneration", {
        input: ` ${firstName} ${lastName}, `,
      })
      .then((res) => {
        setResponse(res.data.data);
      });
  }, [firstName, lastName]);

  useEffect(() => {
    if (response) {
      handleClick();
    }
  }, [response]);

  const handleClick = async () => {
    try {
      // if (isGif) {
      //   setIsGif(!isGif);
      //   componentRef.current.pause();
      //   return;
      // }
      if (
        firstName === prevUserData.firstName &&
        lastName === prevUserData.lastName &&
        componentRef.current
      ) {
        setIsGif(true);
        componentRef.current.play();
        return; // If firstName and lastName haven't changed, don't make the request again
      }
      if (response) {
        setIsGif(true);
        // setAudioPlayed(true);
        const arrayBufferView = new Uint8Array(response);
        Promise.all([
          fetchAudio(audioFileUrl1),
          arrayBufferView,
          fetchAudio(audioFileUrl2),
        ])
          .then((audioBuffers) => {
            // Concatenate the two audio buffers
            const concatenatedBuffer = concatenateBuffers(audioBuffers);
            // Create a new buffer that will contain all audio files
            const audioBlob = new Blob([concatenatedBuffer], {
              type: "audio/mpeg",
            });
            setAudioPrepared(true);
            const url = URL.createObjectURL(audioBlob);
            if (componentRef.current) {
              componentRef.current.src = url;
            }
          })
          .catch((error) => {
            console.error("Error fetching or decoding audio:", error);
          });
        if (componentRef.current) {
          componentRef.current.playbackRate = 2.0;
          componentRef.current.load();
          componentRef.current.play();
        }
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
      setAudioPrepared(false);
    };

    audio?.addEventListener("ended", handleAudioEnded);

    return () => {
      audio?.removeEventListener("ended", handleAudioEnded);
    };
  }, []);

  return (
    <>
      {audioPrepared && (
        <div className="fixed bottom-4 right-4 mr-4 mb-4 cursor-pointer z-10 avatar-animate">
          <Image
            src={isGif ? "/serviceBot.gif" : "/serviceBot.png"}
            alt="GIF"
            width={200}
            height={200}
            className="botImage"
          />
        </div>
      )}
      <audio className="hidden" ref={componentRef} controls />
    </>
  );
};

export default VirtualBot;
