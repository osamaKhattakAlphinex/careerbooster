"use client";
import * as React from "react";
import { AudioRecorder } from "react-audio-voice-recorder";

export default function App() {
  const addAudioElement = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    console.log(url);
  };

  return (
    <div>
      <AudioRecorder
        onRecordingComplete={addAudioElement}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        onNotAllowedOrFound={(err: any) => console.table(err)}
        mediaRecorderOptions={{
          audioBitsPerSecond: 128000,
        }}
      />
      <br />
    </div>
  );
}
