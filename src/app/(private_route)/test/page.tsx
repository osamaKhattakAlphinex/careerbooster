"use client";
import axios from "axios";
import React, { useRef, useState } from "react";

const Test = () => {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const audioContextRef: any = useRef(null);
  const sourceRef: any = useRef(null);
  const componentRef = useRef(null);
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
        // Convert base64 data to ArrayBuffer
        const audioData = response.data.buffer; // Assuming the audio data is in base64 format

        // console.log(audioData);
        // const arrayBuffer = new ArrayBuffer(audioData.data);

        // console.log(arrayBuffer);
        // // Assuming buffer is the ArrayBuffer you receive from the backend

        // Convert ArrayBuffer to Blob
        const audioBlob = new Blob(audioData.data, { type: "audio/mp3" });
        console.log(audioBlob);
        const url = URL.createObjectURL(audioBlob);
        console.log(url);
        setAudioUrl(url);

        // // let fileReader = new FileReader();
        // // let arrayBuffer: any;
        // // fileReader.onloadend = () => {
        // //   arrayBuffer = fileReader.result;
        // //   console.log(arrayBuffer, typeof arrayBuffer);
        // // };

        // // fileReader.readAsArrayBuffer(audioBlob);

        // const audioBuffer = await audioBlob.arrayBuffer();
        // console.log(audioBuffer);

        // // Create an audio context
        // audioContextRef.current = new window.AudioContext();
        // sourceRef.current = audioContextRef.current.createBufferSource();

        // audioContextRef.current.decodeAudioData(
        //   audioBuffer,
        //   (decodedBuffer: any) => {
        //     // Set the buffer to the source node
        //     sourceRef.current.buffer = decodedBuffer;

        //     // Connect the source node to the audio context's destination (speakers)
        //     sourceRef.current.connect(audioContextRef.current.destination);

        //     // Start playing the audio
        //     sourceRef.current.start(0);
        //   }
        // );

        // const audioContext = new window.AudioContext();
        // // Create an audio buffer source node
        // const source = audioContext.createBufferSource();
        // const arrayBuffer = await audioBlob.arrayBuffer();
        // console.log(arrayBuffer);
        // // Decode the received buffer
        // if (arrayBuffer.byteLength) {
        //   console.log(arrayBuffer.byteLength);
        //   audioContext.decodeAudioData(arrayBuffer, (decodedBuffer) => {
        //     debugger;
        //     // Set the buffer to the source node
        //     source.buffer = decodedBuffer;

        //     // Connect the source node to the audio context's destination (speakers)
        //     source.connect(audioContext.destination);
        //     console.log(source);
        //     // Start playing the audio
        //     source.start(0);
        //   });
        // }

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
      <audio controls src={audioUrl} />
    </div>
  );
};

export default Test;
