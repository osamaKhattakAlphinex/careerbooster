"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "@/app/(private_route)/dashboard.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  audioPlayed: boolean;
  showTooltip: boolean;
  setShowTooltip: any;
}

const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  audioPlayed,
  showTooltip,
  setShowTooltip,
}) => {
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
  const [showTooltip, setShowTooltip] = useState(true);
  const [response, setResponse] = useState<any>({});
  const componentRef: any = useRef(null);
  const [listeningUser, setListeningUser] = useState(false);
  const [speechText, setSpeechText] = useState("");
  const [tooltipText, setTooltipText] = useState<string>("Hey, Click me!");
  const audioFileUrl1 = "/speech1.mp3";
  const audioFileUrl2 = "/speech2.mp3";
  const userData = useSelector((state: any) => state.userData);
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
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

  // useEffect(() => {
  //   axios
  //     .post("/api/audioGeneration", {
  //       input: ` ${firstName} ${lastName}, `,
  //     })
  //     .then((res) => {
  //       setResponse(res);
  //     });
  // }, [firstName, lastName]);

  const handleClick = async () => {
    try {
      if (isGif && !listeningUser && tooltipText !== "If yes than click me !") {
        setIsGif(!isGif);
        componentRef.current.pause();
        return;
      }
      if (
        firstName === prevUserData.firstName &&
        lastName === prevUserData.lastName &&
        !listeningUser &&
        tooltipText !== "If yes than click me !"
      ) {
        setIsGif(!isGif);
        setAudioPlayed(true);
        componentRef.current.play();
        return; // If firstName and lastName haven't changed, don't make the request again
      }
      // if (response && tooltipText !== "If yes than click me !") {
      if (!listeningUser && tooltipText !== "If yes than click me !") {
        setIsGif(!isGif);
        setAudioPlayed(true);
        // const audioData = response.data.data;
        // const arrayBufferView = new Uint8Array(audioData);
        Promise.all([
          fetchAudio(audioFileUrl1),
          // arrayBufferView,
          fetchAudio(audioFileUrl2),
        ])
          .then((audioBuffers) => {
            const concatenatedBuffer = concatenateBuffers(audioBuffers);
            // Create a new buffer that will contain all audio files
            const audioBlob = new Blob([concatenatedBuffer], {
              type: "audio/mpeg",
            });

            const url = URL.createObjectURL(audioBlob);
            componentRef.current.src = url;
          })
          .catch((error) => {
            console.error("Error fetching or decoding audio:", error);
          });
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
        return;
      }

      if (tooltipText === "If yes than click me !" && !listeningUser) {
        SpeechRecognition.startListening({
          continuous: true,
          language: "en-US",
        });

        if (!browserSupportsSpeechRecognition) {
          console.log("Your browser does not support speech recognition");
        }
        setTooltipText(`Listening...
        Click Again to Stop`);
        setShowTooltip(true);
        setListeningUser(true);
        return;
      }
      if (listeningUser) {
        SpeechRecognition.stopListening();
        setSpeechText(transcript);
        setListeningUser(false);
        setTooltipText("");
        return;
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    const audio = componentRef.current;

    const handleAudioEnded = () => {
      setIsGif(false); // Set isGif to false when the audio ends
      setAudioPlayed(false);
      setShowTooltip(true);
      setTooltipText("If yes than click me !");
    };

    audio.addEventListener("ended", handleAudioEnded);

    return () => {
      audio.removeEventListener("ended", handleAudioEnded);
    };
  }, []);

  useEffect(() => {
    if (speechText.length > 0 && !listeningUser) {
      axios
        .post("/api/audioAnswer", {
          input: speechText,
        })
        .then((res) => {
          setResponse(res);
        });
    }
  }, [speechText]);

  return (
    <div
      className={`fixed bottom-4 right-4 mr-4 mb-4  cursor-pointer z-10 avatar-animate`}
      onClick={handleClick}
    >
      <Tooltip
        text={tooltipText}
        audioPlayed={audioPlayed}
        showTooltip={showTooltip}
        setShowTooltip={setShowTooltip}
      >
        <Image
          src={isGif ? "/serviceBot.gif" : "/serviceBot.png"}
          alt="GIF"
          width={300}
          height={300}
          className="botImage"
        />
      </Tooltip>
      <audio className="hidden" ref={componentRef} controls />
    </div>
  );
};

export default Avatar;
