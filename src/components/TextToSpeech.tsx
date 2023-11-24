"use client";
import axios from "axios";
import { useState } from "react";

const TextToSpeech = () => {
  const [input, setInput] = useState(
    "This is a sample webapp implementation of OpenAI Whisper"
  );

  const clickHandlerFn = async () => {
    axios
      .post("/api/test", {
        input,
      })
      .then(async (resp) => {
        console.clear();
        console.log(resp.data);
      });
  };

  return (
    <div className="pt-30">
      <h1>Text to Speech with OpenAI</h1>
      <textarea
        name="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        cols={30}
        rows={5}
      />
      <br />
      <button type="button" onClick={clickHandlerFn}>
        START
      </button>
    </div>
  );
};

export default TextToSpeech;
