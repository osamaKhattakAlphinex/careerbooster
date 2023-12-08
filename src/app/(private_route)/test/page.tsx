"use client";
import axios from "axios";
import React, { useRef, useState } from "react";

const Test = () => {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const componentRef: any = useRef(null);

  const handleGenerateSpeech = async () => {
    try {
      const response = await axios.post("/api/audioGeneration", { input });

      if (response) {
        const audioData = response.data.data;
        const arrayBufferView = new Uint8Array(audioData);
        setInput("");
        const audioBlob = new Blob([arrayBufferView], { type: "audio/mpeg" });
        const url = URL.createObjectURL(audioBlob);

        componentRef.current.src = url;
        componentRef.current.load();
        componentRef.current.play();
      } else {
        setMessage("Speech generation failed");
      }
    } catch (error) {
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="ml-[244px]">
      <textarea value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleGenerateSpeech}>Generate Speech</button>
      {message && <p>{message}</p>}
      <audio className="hidden" ref={componentRef} controls />
    </div>
  );
};

export default Test;
