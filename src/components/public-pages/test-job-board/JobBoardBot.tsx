"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const JobBoardBot = () => {
  const [isGif, setIsGif] = useState(false);
  const [audioPrepared, setAudioPrepared] = useState(false);

  const componentRef = useRef<HTMLAudioElement | null>(null);

  const fetchAudio = async (audioFileUrl: string) => {
    try {
      const response = await fetch(audioFileUrl);
      const audioBlob = await response.blob();
      const audioData = await audioBlob.arrayBuffer();
      const arrayBufferView = new Uint8Array(audioData);
      const audio = new Blob([arrayBufferView], {
        type: "audio/mpeg",
      });
      setIsGif(true)
      setAudioPrepared(true);
      const url = URL.createObjectURL(audio);
      if (componentRef.current) {
        componentRef.current.src = url;
        componentRef.current.load();
        componentRef.current.play();
      }
    } catch (error) {
      console.error("Error fetching the audio file:", error);
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

  useEffect(() => {
    fetchAudio("/JobBoardSpeech.mp3");
  }, []);
  return (
    <>
      {audioPrepared && (
        <div
          className={`fixed bottom-4 right-4 mr-4 mb-4 cursor-pointer z-10 avatar-animate`}
        >
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

export default JobBoardBot;
