"use client"
import Image from 'next/image';
import React, { useRef, useState } from 'react'

const JobBoardBot = () => {
    const [isGif, setIsGif] = useState(false);
  const [audioPrepared, setAudioPrepared] = useState(false);
  const [response, setResponse] = useState<any>({});
  const audioFileUrl1 = "/JobBoardSpeech.mp3";

  const componentRef= useRef< HTMLAudioElement | null >(null);
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
  )
}

export default JobBoardBot