"use client";
import axios from "axios";
import React, { useState } from "react";

const Test = () => {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const handleGenerateSpeech = async () => {
    try {
      const response = await axios.post(
        "/api/audioGeneration",
        { input }
        // { responseType: "arraybuffer" }
      );
      if (response.status === 200) {
        setMessage("Speech generated successfully");
        // Play the audio
        console.log(response.data);
        const audioBlob = new Blob([response.data.buffer], {
          type: "audio/mp3",
        });

        const url = URL.createObjectURL(audioBlob);
        console.log(url);
        setAudioUrl(url);
        // You can play the audio here using HTML audio element or any audio player library
      } else {
        setMessage("Speech generation failed");
      }
    } catch (error) {
      setMessage("Something went wrong");
      // Handle network errors or other exceptions
    }
  };

  return (
    <div className="ml-[244px]">
      <textarea value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleGenerateSpeech}>Generate Speech</button>
      {message && <p>{message}</p>}
      {audioUrl && <audio controls src={audioUrl} />}
    </div>
  );
};

export default Test;
